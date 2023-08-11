<!-- LoadTrendingMovies.svelte -->

<script>
	import {
		getTrendingMovies,
		trendingMovies,
		trendingMoviePageNumber
	} from '../lib/api/trendingmovies.js';
	import { onMount, afterUpdate } from 'svelte';
	import { prioritizeImages } from '../lib/api/prioritizeimages';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import { roundPopularity, formatDate } from '../lib/cardutils.js';
	import NoMoreResults from '../design/NoMoreResults.svelte';

	let trendingMovieData = [];
	let trendingTimeWindow = 'day'; // Initialize the trendingTimeWindow variable with 'day'
	let movieData = [];
	let selectedItem = null;
	let currentPage = 1;

	// Subscribe to the trending movies store
	trendingMovies.subscribe((value) => {
		trendingMovieData = value;
	});

	// Subscribe to trendingMoviePageNumber
	trendingMoviePageNumber.subscribe((value) => {
		currentPage = value;
	});

	const handleLoadMore = () => {
		// Increment current page and call getTrendingMovies
		getTrendingMovies(trendingTimeWindow);
	};

	onMount(() => {
		trendingMoviePageNumber.set(1); // Reset the page number when the component mounts
		getTrendingMovies(trendingTimeWindow); // Load trending movies for the initial time window when the component mounts
	});

	afterUpdate(() => {
		getTrendingMovies(trendingTimeWindow);
	});

	$: {
		if (trendingTimeWindow) {
			// If the time window is defined
			trendingMoviePageNumber.set(1); // Reset the page number when time window changes
			getTrendingMovies(trendingTimeWindow);
		}
	}

	// Subscribe to the movies store
	trendingMovies.subscribe((value) => {
		movieData = value.map((movie) => ({
			// Mapping the properties you need
			title: movie.title,
			id: movie.id,
			datatype: 'movie',
			genre_ids: movie.genre_ids,
			rating: movie.vote_average,
			popularity: roundPopularity(movie.popularity), // Use appropriate rating property
			backdrop_path: movie.poster_path,
			overview: movie.overview,
			release_date: formatDate(movie.release_date),
			credits: movie.id
		}));
	});

	const handleLoadTrending = () => {
		getTrendingMovies(trendingTimeWindow);
	};

	const handleTimeWindowChange = (event) => {
		trendingTimeWindow = event.target.value;
		console.log('trendingTimeWindow:', trendingTimeWindow); // Add this log statement
	};

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}
</script>

<!-- The rest of your component's markup goes here -->
<div class="page-header-container">
	<h1>Trending Movies</h1>

	<div style="display: flex; gap: 20px;">
		<input
			type="radio"
			bind:group={trendingTimeWindow}
			value="day"
			id="day"
			on:change={handleTimeWindowChange}
		/>
		<label for="day">Today</label>
		<input
			type="radio"
			bind:group={trendingTimeWindow}
			value="week"
			id="week"
			on:change={handleTimeWindowChange}
		/>
		<label for="week">This Week</label>
	</div>
</div>

<!-- Display the trending movies -->
<CardsContainer>
	{#each movieData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />

{#if currentPage <= 5}
	<!-- Condition to check if more pages are available -->
	<LoadMoreButton onClick={handleLoadMore} />
{:else}
	<NoMoreResults />
{/if}
