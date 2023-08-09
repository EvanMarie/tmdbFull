<!-- SearchMovies.svelte -->

<script>
	import { onMount } from 'svelte';
	import {
		searchMovies,
		movieResults,
		searchMoviePageStore,
		totalMoviePagesStore
	} from '$lib/api/movies.js';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';

	let movieSearchData = [];
	let searchQuery = 'unicorn'; // Initialize search query with "unicorn"
	let currentPage = 1;
	let totalMoviePages = 1;

	// Subscribe to the search results store
	movieResults.subscribe((value) => {
		movieSearchData = value;
	});

	searchMoviePageStore.subscribe((value) => (currentPage = value));
	totalMoviePagesStore.subscribe((value) => (totalMoviePages = value));

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const loadMoreMovies = () => {
		searchMovies(searchQuery, true);
	};

	onMount(() => {
		console.log('Performing initial search for "unicorn"');
		handleSearch();
	});

	const handleSearch = () => {
		console.log('Handling search for:', searchQuery);
		movieSearchData = [];
		searchMovies(searchQuery);
	};
</script>
<div class="page-header-container" >
	<p>Search Movies</p>

	<div class="input-and-button">
<input
	type="text"
	bind:value={searchQuery}
	placeholder="Search for a movie..."
	on:keydown={handleKeyPress}
/>

<button on:click={handleSearch} class="button-styles">go</button></div>
</div>
{#if movieSearchData.length > 0}
	{#each movieSearchData.sort(prioritizeImages) as movie}
	    <div>{movie.title}</div>
    <div>{movie.release_date}</div>
    <div>{movie.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
  {/each}

{:else}
	<p>No search results to display. Search query: {searchQuery}</p>
	<!-- Added search query here for debugging -->
{/if}

{#if currentPage <= totalMoviePages}
	<LoadMoreButton onClick={loadMoreMovies} />
{/if}

<ReturnToTop />
