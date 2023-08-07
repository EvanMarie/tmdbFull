<!-- SearchAll.svelte -->

<script>
	import {
		searchMulti,
		multiResults,
		searchMultiPageStore,
		totalMultiPagesStore
	} from '$lib/api/multiSearch.js';
	import { prioritizeImages } from '../lib/api/prioritizeImages';
	import ReturnToTop from './design/ReturnToTop.svelte';

	let multiSearchData = [];
	let searchQuery = '';
	let currentPage = 1;
	let totalMultiPages = 1;

	multiResults.subscribe((value) => {
		multiSearchData = value;
	});

	searchMultiPageStore.subscribe((value) => (currentPage = value));
	totalMultiPagesStore.subscribe((value) => (totalMultiPages = value));

	const handleSearch = () => {
		searchMulti(searchQuery);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const loadMore = () => {
		searchMulti(searchQuery, true);
	};
</script>

<input
	type="text"
	bind:value={searchQuery}
	placeholder="Search entire datab..."
	on:keydown={handleKeyPress}
/>

<button on:click={handleSearch}>Search</button>

{#if multiSearchData.length > 0}
	{#each multiSearchData.sort(prioritizeImages) as result}
		<div>{result.name || result.title}</div>
		<div>{result.release_date || result.first_air_date || result.known_for_department}</div>
		<div>{result.popularity}</div>
		{#if result.profile_path || result.poster_path}
			<img
				src={`https://image.tmdb.org/t/p/w500${result.profile_path || result.poster_path}`}
				alt={result.name || result.title}
				style="width: 300px;"
			/>
		{/if}
	{/each}
	{#if currentPage <= totalMultiPages}
		<button on:click={loadMore} class="button-styles">Load More</button>
	{/if}
	<ReturnToTop />
{:else}
	<p>No search results to display.</p>
{/if}
