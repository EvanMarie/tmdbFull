// trendingMovies.js

import axios from 'axios';
import { writable } from 'svelte/store';
import { VITE_ACCESS_TOKEN as ACCESS_TOKEN } from './tmdb.js';
export const trendingMovies = writable([]);
export let trendingMoviePageNumber = writable(1); // Change to a writable store

export const getTrendingMovies = async (trendingTimeWindow) => {
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	let currentPage;
	trendingMoviePageNumber.subscribe((value) => {
		currentPage = value;
	});

	if (currentPage > 5) return; // Skip if we already have 100 movies

	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/trending/movie/${trendingTimeWindow}?language=en-US&page=${currentPage}`, // use currentPage here
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);

		// If it's the first page of trending movies, update the trendingMovies store
		// Otherwise, append the new results to the existing ones
		if (currentPage === 1) {
			trendingMovies.set(response.data.results);
		} else {
			trendingMovies.update((existingResults) => [...existingResults, ...response.data.results]);
		}

		trendingMoviePageNumber.update((n) => n + 1); // Increment the trending movie page number for the next trending movies fetch
	} catch (error) {
		console.error(error);
	}
};
