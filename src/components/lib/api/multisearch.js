// multiSearch.js

import { writable, get } from 'svelte/store';
import axios from 'axios';
import { getActorDetails } from './popularpeople';

export const multiSearchDataStore = writable([]);

export const multiResults = writable([]);
export const searchMultiPageStore = writable(1);
export const totalMultiPagesStore = writable(1);
export const movieResults = writable([]);
export const personResults = writable([]);

export const searchMulti = async (query, loadMore = false) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const pageToFetch = loadMore ? get(searchMultiPageStore) + 1 : 1;

	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
			query
		)}&language=en-US&page=${pageToFetch}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN}`
		}
	};

	try {
		const response = await axios.request(options);
		let results = response.data.results;

		// Include actor details for persons
		const peopleWithDetails = await Promise.all(
			results.map(async (result) => {
				if (result.media_type === 'person') {
					const actorDetail = await getActorDetails(result.id);
					return { ...result, actorDetail };
				}
				return result;
			})
		);

		results = loadMore ? [...get(multiResults), ...peopleWithDetails] : peopleWithDetails;

		multiResults.set(results);
		searchMultiPageStore.set(response.data.page);
		totalMultiPagesStore.set(response.data.total_pages);

		// Extract movies and persons from results
		const newMovieResults = results.filter((result) => result.media_type === 'movie');
		const newPersonResults = results.filter((result) => result.media_type === 'person');

		// Set the stores
		movieResults.set(newMovieResults);
		personResults.set(newPersonResults);
	} catch (error) {
		console.error(error);
	}
};
