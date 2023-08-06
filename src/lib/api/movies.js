// movies.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const movies = writable([]);
export let moviePageNumber = 1; // Maintain the state of the movie page number

export const movieResults = writable([]); // Add the movieResults store for search results
export let searchMoviePageNumber = 1; // Maintain the state of the search movie page number

export const getMovies = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${moviePageNumber}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		movies.set(response.data.results);
		moviePageNumber++; // Increment the movie page number after successful data fetch
		console.log(response.data.results); // This will log the data about the movies on the new page
	} catch (error) {
		console.error(error);
	}
};

export const searchMovies = async (query) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&page=${searchMoviePageNumber}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		// If it's the first page of search results, update the movieResults store
		// Otherwise, append the new results to the existing ones
		if (searchMoviePageNumber === 1) {
			movieResults.set(response.data.results);
		} else {
			movieResults.update((existingResults) => [...existingResults, ...response.data.results]);
		}
		console.log(response.data.results); // This will log the data about the returned movies
		searchMoviePageNumber++; // Increment the search movie page number for the next search
	} catch (error) {
		console.error(error);
	}
};
