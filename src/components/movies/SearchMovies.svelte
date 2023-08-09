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
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';

	let movieSearchData = [];
	let searchQuery = 'unicorn'; // Initialize search query with "unicorn"
	let currentPage = 1;
	let totalMoviePages = 1;

	let selectedMovie = null; // Variable to hold the selected movie

	const openMovieModal = (movie) => {
		selectedMovie = movie;
	};

	const closeMovieModal = () => {
		selectedMovie = null;
	};

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

	// Subscribe to the movieResults store
	movieResults.subscribe((value) => {
		movieSearchData = value.map((movie) => ({
			id: movie.id,
			datatype: 'movie',
			genre_ids: movie.genre_ids,
			title: movie.title,
			genre_ids: movie.genre_ids,
			rating: movie.vote_average,
			backdrop_path: movie.poster_path,
			overview: movie.overview
			// Add any other properties that you need
		}));
	});
</script>

<div class="page-header-container">
	<p>Search Movies</p>

	<div class="input-and-button">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search for a movie..."
			on:keydown={handleKeyPress}
		/>

		<button on:click={handleSearch} class="button-styles">go</button>
	</div>
</div>

{#if movieSearchData.length > 0}
	<CardsContainer>
		{#each movieSearchData.sort(prioritizeImages) as item}
			<Card {item} on:itemClick={() => openMovieModal(item)} />
		{/each}
	</CardsContainer>
	<Modal selectedItem={selectedMovie} close={closeMovieModal} />
{:else}
	<p>No search results to display. Search query: {searchQuery}</p>
	<!-- Added search query here for debugging -->
{/if}

{#if currentPage <= totalMoviePages}
	<LoadMoreButton onClick={loadMoreMovies} />
{/if}

<ReturnToTop />
