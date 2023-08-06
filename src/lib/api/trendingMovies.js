// trendingMovies.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const trendingMovies = writable([]);
export let trendingMoviePageNumber = 1; // Maintain the state of the trending movie page number

export const getTrendingMovies = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${trendingMoviePageNumber}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		// If it's the first page of trending movies, update the trendingMovies store
		// Otherwise, append the new results to the existing ones
		if (trendingMoviePageNumber === 1) {
			trendingMovies.set(response.data.results);
		} else {
			trendingMovies.update((existingResults) => [...existingResults, ...response.data.results]);
		}
		console.log(response.data.results); // This will log the data about the trending movies on the new page
		trendingMoviePageNumber++; // Increment the trending movie page number for the next trending movies fetch
	} catch (error) {
		console.error(error);
	}
};
