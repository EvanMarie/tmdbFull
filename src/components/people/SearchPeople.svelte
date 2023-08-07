<!-- SearchPeople.svelte -->

<script>
	import { searchPeople, searchResults, totalSearchPagesStore } from '$lib/api/popularPeople.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';

	let searchQuery = '';
	let searchPageNumber = 1;
	let searchResultsData = [];
	let totalSearchPages = 1;

	// Subscribe to the search results store
	searchResults.subscribe((value) => {
		searchResultsData = value;
	});

	// Load the first page of search results when the component mounts
	onMount(() => {
		// Initially, do not load any search results until the user submits the form
	});

	totalSearchPagesStore.subscribe((value) => (totalSearchPages = value));

const handleSearch = async () => {
	searchResultsData = []; // Clear existing search results
	await searchPeople(searchQuery, true);
};

const handleLoadMore = async () => {
	await searchPeople(searchQuery); // or searchPeople(searchQuery, false);
};
</script>


<form on:submit|preventDefault={handleSearch}>
	<input type="text" bind:value={searchQuery} placeholder="Search for an actor..." />
	<button type="submit">Search</button>
</form>

<!-- Display the search results -->
{#if searchResultsData.length > 0}
	{#each searchResultsData.sort(prioritizeImages) as person}
		<div>{person.name}</div>
		<div>{person.known_for_department}</div>
		<div>{person.popularity}</div>
		<img
			src={`https://image.tmdb.org/t/p/w500${person.profile_path || person.poster_path}`}
			alt={person.name}
			style="width: 300px;"
		/>
	{/each}
	{#if searchResultsData.length > 0 && searchPageNumber <= totalSearchPages}
		<button on:click={handleLoadMore} class="button-styles">Load More</button>
	{/if}
{:else}
	<p>No search results to display.</p>
{/if}
