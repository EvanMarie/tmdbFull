// trendingPeople.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const trendingPeople = writable([]);
export let trendingPageNumber = 1; // Maintain the state of the trending page number

export const getTrendingPeople = async () => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/trending/person/week?language=en-US&page=${trendingPageNumber}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};
	try {
		const response = await axios.request(options);
		// If it's the first page of trending people, update the trendingPeople store
		// Otherwise, append the new results to the existing ones
		if (trendingPageNumber === 1) {
			trendingPeople.set(response.data.results);
		} else {
			trendingPeople.update((existingResults) => [...existingResults, ...response.data.results]);
		}
		console.log(response.data.results); // This will log the data about the trending people on the new page
		trendingPageNumber++; // Increment the trending page number for the next trending people fetch
	} catch (error) {
		console.error(error);
	}
};
