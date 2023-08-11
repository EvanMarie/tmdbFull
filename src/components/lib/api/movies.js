// movies.js

import { writable, get } from 'svelte/store';
import axios from 'axios';
import { VITE_ACCESS_TOKEN as ACCESS_TOKEN } from './tmdb.js';
export const movies = writable([]);
export const moviePageStore = writable(1);

export const movieResults = writable([]);
export const searchMoviePageStore = writable(1);

export const totalMoviePagesStore = writable(1);

export const getMovies = async (filter = 'popular', loadMore = false) => {
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const pageToFetch = loadMore ? get(moviePageStore) + 1 : 1;

	const url = `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${pageToFetch}`;

	try {
		const response = await axios.request({
			method: 'GET',
			url,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		});

		const fetchedMovies = response.data.results;

		if (loadMore) {
			movies.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
		} else {
			movies.set(fetchedMovies);
		}
		moviePageStore.set(response.data.page);
		totalMoviePagesStore.set(response.data.total_pages);
	} catch (error) {
		console.error(error);
	}
};

export const moviesByGenreStore = writable([]);
export const genrePageStore = writable(1);
export const totalGenrePagesStore = writable(1);

export const searchMovies = async (searchQuery, loadMore = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const pageToFetch = loadMore ? get(searchMoviePageStore) + 1 : 1;

	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
			searchQuery
		)}&language=en-US&page=${pageToFetch}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		let fetchedMovies = response.data.results;

		if (loadMore) {
			movieResults.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
		} else {
			movieResults.set(fetchedMovies);
		}

		searchMoviePageStore.set(response.data.page);
		totalMoviePagesStore.set(response.data.total_pages);
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
