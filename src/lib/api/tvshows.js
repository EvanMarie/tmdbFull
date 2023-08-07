// tvShows.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const tvShows = writable([]);
export const tvShowPageStore = writable(1); // Current page number
export const totalTVShowPagesStore = writable(1); // Total pages available

export const getTVShows = async (searchQuery = '', append = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	let fetchedShows = [];
	let page;

	// Get the current page number from the store
	tvShowPageStore.subscribe((value) => {
		page = value;
	});

	try {
		let url;
		if (searchQuery) {
			url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
				searchQuery
			)}&page=${page}&language=en-US`;
		} else {
			url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
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
		// Updating the total pages available
		totalTVShowPagesStore.set(response.data.total_pages);
		// Filtering and sorting as needed
		const englishShows = response.data.results.filter((show) => show.original_language === 'en');
		const sortedShows = englishShows.sort((a, b) => b.vote_average - a.vote_average);

		fetchedShows = sortedShows;

		if (append) {
			tvShows.update((existingShows) => [...existingShows, ...fetchedShows]);
		} else {
			tvShows.set(fetchedShows);
		}
		// Incrementing the page number for the next fetch
		tvShowPageStore.update((n) => n + 1);
	} catch (error) {
		console.error(error);
	}
};

export const loadMoreTVShows = (searchQuery) => () => {
	// Pass 'true' for the 'append' parameter to append the results
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
			}&with_original_language=en`,
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
