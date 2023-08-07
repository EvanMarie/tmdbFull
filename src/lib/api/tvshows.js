// tvShows.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const tvShows = writable([]);
export let tvShowPageNumber = 1;

export const getTVShows = async (searchQuery = '', append = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const MIN_SHOWS = 20; // Minimum number of shows to fetch

	let fetchedShows = []; // array to keep track of fetched English shows

	try {
		while (fetchedShows.length < MIN_SHOWS) {
			let url = '';
			if (searchQuery) {
				url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
					searchQuery
				)}&page=${tvShowPageNumber}&language=en-US`;
			} else {
				url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${tvShowPageNumber}`;
			}
			const options = {
				method: 'GET',
				url,
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${ACCESS_TOKEN}`
				}
			};

			const response = await axios.request(options);
			// Filter the TV shows to only include those with 'en' as the original language
			const englishShows = response.data.results.filter((show) => show.original_language === 'en');

			// Sort the English TV shows by rating in descending order (highest first)
			const sortedShows = englishShows.sort((a, b) => b.vote_average - a.vote_average);
			fetchedShows = [...fetchedShows, ...sortedShows];

			console.log(response.data.results);
			tvShowPageNumber++;
		}
		if (append) {
			tvShows.update((existingShows) => [...existingShows, ...fetchedShows]);
		} else {
			tvShows.set(fetchedShows); // update the tvShows store
		}
	} catch (error) {
		console.error(error);
	}
};

export const loadMoreTVShows = (searchQuery) => async () => {
	// Here, we pass 'true' for the 'append' parameter so that the results get appended to the existing ones
	getTVShows(searchQuery, true);
};

export const getTVGenres = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: 'https://api.themoviedb.org/3/genre/tv/list?language=en-US',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		return response.data.genres;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getTVShowsByGenre = async (genreId, page = 1) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const requests = [];

	// Create three requests
	for (let i = 0; i < 3; i++) {
		requests.push({
			method: 'GET',
			url: `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=en-US&page=${
				page + i
			}`,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		});
	}

	try {
		// Use axios.all to send all requests concurrently
		const responses = await axios.all(requests.map((request) => axios.request(request)));
		// Combine the results from all responses
		return responses.reduce((results, response) => results.concat(response.data.results), []);
	} catch (error) {
		console.error(error);
		return [];
	}
};
