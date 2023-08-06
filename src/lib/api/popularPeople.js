// popularPeople.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const people = writable([]);
export const searchResults = writable([]);
export let pageNumber = 1; // Maintain the state of the page number
export let searchPageNumber = 1; // Maintain the state of the search page number

export const getPeople = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: 'https://api.themoviedb.org/3/person/popular?language=en-US&page=' + pageNumber,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		people.set(response.data.results);
		pageNumber++; // Increment the page number after successful data fetch
		console.log(response.data.results); // This will log the data about the people on the new page
	} catch (error) {
		console.error(error);
	}
};

export const searchPeople = async (query) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/person?language=en-US&query=${query}&page=${searchPageNumber}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		// If it's the first page of search results, update the searchResults store
		// Otherwise, append the new results to the existing ones
		if (searchPageNumber === 1) {
			searchResults.set(response.data.results);
		} else {
			searchResults.update((existingResults) => [...existingResults, ...response.data.results]);
		}
		console.log(response.data.results); // This will log the data about the returned people
		searchPageNumber++; // Increment the search page number for the next search
	} catch (error) {
		console.error(error);
	}
};
