// This is tvShows.js

import axios from 'axios';
import { writable, get } from 'svelte/store';

export const tvShows = writable([]);
export const tvShowPageStore = writable(1); // Current page number
export const totalTVShowPagesStore = writable(1); // Total pages available

export const getTVShows = async (filter = 'top_rated', loadMore = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const pageToFetch = loadMore ? get(tvShowPageStore) + 1 : 1;

	const url = `https://api.themoviedb.org/3/tv/${filter}?language=en-US&page=${pageToFetch}`;

	try {
		const response = await axios.request({
			method: 'GET',
			url,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		});

		const fetchedShows = response.data.results;

		if (loadMore) {
			tvShows.update((existingShows) => [...existingShows, ...fetchedShows]);
			tvShowPageStore.update((n) => n + 1); // Increment by 1 as we fetched 1 page
		} else {
			tvShows.set(fetchedShows);
			tvShowPageStore.set(1); // Reset to the first page if a new filter is applied
		}

		totalTVShowPagesStore.set(response.data.total_pages);
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
