import { writable, get } from 'svelte/store';
import axios from 'axios';

export const multiResults = writable([]);
export const searchMultiPageStore = writable(1);
export const totalMultiPagesStore = writable(1);

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
		const results = loadMore
			? [...get(multiResults), ...response.data.results]
			: response.data.results;

		multiResults.set(results);
		searchMultiPageStore.set(response.data.page);
		totalMultiPagesStore.set(response.data.total_pages);
	} catch (error) {
		console.error(error);
	}
};
