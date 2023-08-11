// popularPeople.js

import axios from 'axios';
import { writable } from 'svelte/store';
import { VITE_ACCESS_TOKEN as ACCESS_TOKEN } from './tmdb.js';
export const searchResults = writable([]);
export let searchPageNumber = 1; // Maintain the state of the search page number
export const totalSearchPagesStore = writable(1); // Total pages available for search results

export const people = writable([]);
export let pageNumber = writable(1); // Change this to a writable store
export const totalPopularPagesStore = writable(1);

export const getPeople = async (loadMore = false) => {
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	let currentPage;
	pageNumber.subscribe((value) => {
		currentPage = value;
	});

	if (!loadMore && currentPage > 1) return;

	let response; // Define the response variable outside of the loop

	// Loop to fetch 3 pages
	for (let i = 0; i < 3; i++) {
		const options = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/person/popular?language=en-US&page=' + currentPage,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		};

		// try {
		// 	response = await axios.request(options); // Update the response variable here
		// 	people.update((existingResults) => [...existingResults, ...response.data.results]);
		// 	totalPopularPagesStore.set(response.data.total_pages);
		// 	pageNumber.update((n) => n + 1);
		// } catch (error) {
		// 	console.error(error);
		// }
		try {
			response = await axios.request(options);

			// Create a new array containing the people with their details
			const peopleWithDetails = await Promise.all(
				response.data.results.map(async (person) => {
					const actorDetail = await getActorDetails(person.id); // Fetch actor details and use directly
					return { ...person, actorDetail };
				})
			);

			people.update((existingResults) => [...existingResults, ...peopleWithDetails]);
			totalPopularPagesStore.set(response.data.total_pages);
			pageNumber.update((n) => n + 1);
		} catch (error) {
			console.error(error);
		}

		if (currentPage >= response.data.total_pages) break; // Now response is in scope
	}
};

export const searchPeople = async (query, resetPageNumber = false) => {
	if (resetPageNumber) {
		searchPageNumber = 1;
	}
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
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

		// Create a new array containing the people with their details
		const peopleWithDetails = await Promise.all(
			response.data.results.map(async (person) => {
				const actorDetail = await getActorDetails(person.id); // Fetch actor details
				return { ...person, actorDetail };
			})
		);

		// If it's the first page of search results, update the searchResults store and set the total pages
		if (searchPageNumber === 1) {
			searchResults.set(peopleWithDetails);
			totalSearchPagesStore.set(response.data.total_pages); // Set the total pages for search results
		} else {
			searchResults.update((existingResults) => [...existingResults, ...peopleWithDetails]);
		}

		searchPageNumber++; // Increment the search page number for the next search
	} catch (error) {
		console.error(error);
	}
};

// Import svelte store to hold the actor details
export const actorDetails = writable(null);

export const getActorDetails = async (personId) => {
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const url = `https://api.themoviedb.org/3/person/${personId}`;
	const options = {
		method: 'GET',
		url: url,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		return response.data; // Return the actor details
	} catch (error) {
		console.error(error);
		return null; // Handle the error by returning null or appropriate error object
	}
};
