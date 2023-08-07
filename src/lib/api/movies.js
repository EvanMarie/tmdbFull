import { writable, get } from 'svelte/store';
import axios from 'axios';

export const movies = writable([]);
export const moviePageStore = writable(1);

export const movieResults = writable([]);
export const searchMoviePageStore = writable(1);

export const totalMoviePagesStore = writable(1);

export const getMovies = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${get(moviePageStore)}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		movies.set(response.data.results);
		moviePageStore.update((n) => n + 1);
		console.log(response.data.results);
	} catch (error) {
		console.error(error);
	}
};

export const searchMovies = async (searchQuery, append = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
			searchQuery
		)}&language=en-US&page=${get(searchMoviePageStore)}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		if (append) {
			movieResults.update((existingMovies) => [...existingMovies, ...response.data.results]);
		} else {
			movieResults.set(response.data.results);
		}
		searchMoviePageStore.update((n) => n + 1);
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
