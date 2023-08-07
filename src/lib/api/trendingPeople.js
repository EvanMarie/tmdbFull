// trendingPeople.js
import axios from 'axios';
import { writable } from 'svelte/store';

export const trendingPeople = writable([]);
export let trendingPageNumber = 1; // Change from const to let

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
		if (trendingPageNumber === 1) {
			trendingPeople.set(response.data.results);
		} else {
			trendingPeople.update((existingResults) => [...existingResults, ...response.data.results]);
		}
		console.log(response.data.results);
		trendingPageNumber++;
	} catch (error) {
		console.error(error);
	}
};
