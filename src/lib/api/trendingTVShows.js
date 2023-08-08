// LoadTrendingTvShows.svelte

import axios from 'axios';
import { writable } from 'svelte/store';

export const trendingTVShows = writable([]);
export let trendingTVShowPageNumber = writable(1); // Change to a writable store
export let totalTrendingTVShowPages = writable(1);

export const getTrendingTVShows = async (trendingTimeWindow) => {
	let currentPage;
	trendingTVShowPageNumber.subscribe((value) => {
		currentPage = value;
	});

	if (currentPage > 5) return; // Skip if we already have 100 TV shows

	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/trending/tv/${trendingTimeWindow}?language=en-US&page=${currentPage}`, // use currentPage here
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);

		totalTrendingTVShowPages.set(response.data.total_pages);

		// If it's the first page of trending TV shows, update the trendingTVShows store
		// Otherwise, append the new results to the existing ones
		if (currentPage === 1) {
			trendingTVShows.set(response.data.results);
		} else {
			trendingTVShows.update((existingResults) => [...existingResults, ...response.data.results]);
		}

		trendingTVShowPageNumber.update((n) => n + 1); // Increment the trending TV show page number for the next trending TV shows fetch
	} catch (error) {
		console.error(error);
	}
};
