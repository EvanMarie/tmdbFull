<!-- SearchPeople.svelte -->

<script>
	import { searchPeople, searchResults, totalSearchPagesStore } from '$lib/api/popularPeople.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import SearchButton from '../design/SearchButton.svelte';

	let searchQuery = 'Chaplin'; // Set the initial search query to "Chaplin"
	let searchPageNumber = 1;
	let searchResultsData = [];
	let totalSearchPages = 1;

	// Subscribe to the search results store
	searchResults.subscribe((value) => {
		searchResultsData = value;
	});

	// Load the first page of search results when the component mounts
	onMount(async () => {
		// Perform the initial search when the component mounts
		await handleSearch();
	});

	totalSearchPagesStore.subscribe((value) => (totalSearchPages = value));

	const handleSearch = async () => {
		searchResultsData = []; // Clear existing search results
		await searchPeople(searchQuery, true);
	};

	const handleLoadMore = async () => {
		searchPageNumber++; // Increment the search page number
		await searchPeople(searchQuery); // or searchPeople(searchQuery, false);
	};
</script>
<div class="page-header-container"><p>Search People </p>
<form on:submit|preventDefault={handleSearch}>
	<div class="input-and-button">
	<input type="text" bind:value={searchQuery} placeholder="Search for an actor..." />
	<SearchButton/></div>
</form></div>

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

	<ReturnToTop />
	{#if searchResultsData.length > 0 && searchPageNumber < totalSearchPages}
		<LoadMoreButton onClick={handleLoadMore} />
	{/if}
{:else}
	<p>No search results to display.</p>
{/if}
