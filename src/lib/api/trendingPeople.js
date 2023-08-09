// trendingPeople.js

import axios from 'axios';
import { writable } from 'svelte/store';

export const trendingPeople = writable([]);
export let trendingPageNumber = 1; // Current page number
export const totalTrendingPages = writable(1); // Total pages available for trending people

export const getTrendingPeople = async (loadMore = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

	if (!loadMore && trendingPageNumber > 1) return;

	// Loop to fetch 3 pages
	for (let i = 0; i < 3; i++) {
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
			trendingPeople.update((existingResults) => [...existingResults, ...response.data.results]);
			totalTrendingPages.set(response.data.total_pages); // Update the total pages using set method
			trendingPageNumber++; // Increment the page number
			if (trendingPageNumber >= response.data.total_pages) break; // Compare with the response data directly
		} catch (error) {
			console.error(error);
		}
	}
};
