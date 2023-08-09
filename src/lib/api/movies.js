// movies.js

import { writable, get } from 'svelte/store';
import axios from 'axios';

export const movies = writable([]);
export const moviePageStore = writable(1);

export const movieResults = writable([]);
export const searchMoviePageStore = writable(1);

export const totalMoviePagesStore = writable(1);

export const getMovies = async (append = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	let fetchedMovies = [];
	const requests = [];

	for (let i = 0; i < 3; i++) {
		requests.push({
			method: 'GET',
			url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${
				get(moviePageStore) + i
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
		fetchedMovies = responses.reduce(
			(results, response) => results.concat(response.data.results),
			[]
		);

		if (append) {
			movies.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
		} else {
			movies.set(fetchedMovies);
		}
		moviePageStore.update((n) => n + 3); // Increment by 3 as we fetched 3 pages
		totalMoviePagesStore.set(responses[0].data.total_pages); // Assuming all pages have the same total
		console.log(fetchedMovies);
	} catch (error) {
		console.error(error);
	}
};

export const moviesByGenreStore = writable([]);
export const genrePageStore = writable(1);
export const totalGenrePagesStore = writable(1);

export const searchMovies = async (searchQuery, append = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	let fetchedMovies = [];
	const requests = [];

	for (let i = 0; i < 3; i++) {
		requests.push({
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
				searchQuery
			)}&language=en-US&page=${get(searchMoviePageStore) + i}`,
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
		fetchedMovies = responses.reduce(
			(results, response) => results.concat(response.data.results),
			[]
		);

		if (append) {
			movieResults.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
		} else {
			movieResults.set(fetchedMovies);
		}
		searchMoviePageStore.update((n) => n + 3); // Increment by 3 as we fetched 3 pages
		totalMoviePagesStore.set(responses[0].data.total_pages); // Assuming all pages have the same total
	} catch (error) {
		console.error(error);
	}
};

export const getMoviesByGenre = async (genreId, page = 1) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const requests = [];

	// Create three requests
	for (let i = 0; i < 3; i++) {
		requests.push({
			method: 'GET',
			url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${
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
