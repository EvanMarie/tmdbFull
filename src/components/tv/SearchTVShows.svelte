<!-- SearchTVShows.svelte -->
<script>
	import {
		getTVShows,
		tvShows,
		loadMoreTVShows,
		tvShowPageStore,
		totalTVShowPagesStore
	} from '$lib/api/tvShows.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';

	let tvShowData = [];
	let searchQuery = '';
	let currentPage = 1;
	let totalTVShowPages = 1;

	tvShows.subscribe((value) => (tvShowData = value));
	tvShowPageStore.subscribe((value) => (currentPage = value));
	totalTVShowPagesStore.subscribe((value) => (totalTVShowPages = value));

	const handleSearch = () => {
		getTVShows(searchQuery); // You might need to modify getTVShows function to accept query as a parameter
	};

	// Handle search when Enter key is pressed
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};
</script>

<input
	type="text"
	bind:value={searchQuery}
	placeholder="Search for a TV show..."
	on:keydown={handleKeyPress}
/>

<button on:click={handleSearch}>Search TV Shows</button>

<!-- Display the TV show search results -->
{#if tvShowData.length > 0}
	{#each tvShowData.sort(prioritizeImages) as show}
		<div>{show.name}</div>
		<div>{show.first_air_date}</div>
		<div>{show.popularity}</div>
		<img
			src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
			alt={show.name}
			style="width: 300px;"
		/>
	{/each}
{:else}
	<p>No search results to display.</p>
{/if}

	<ReturnToTop />
{#if tvShowData.length > 0}
	<LoadMoreButton onClick={loadMoreTVShows(searchQuery)} />
{/if}
