<!-- SearchAll.svelte -->

<script>
	import { onMount } from 'svelte';
	import {
		searchMulti,
		multiResults,
		searchMultiPageStore,
		totalMultiPagesStore
	} from '$lib/api/multiSearch.js';
	import { prioritizeImages } from '../lib/api/prioritizeImages';
	import ReturnToTop from './design/ReturnToTop.svelte';
	import Card from './design/Card.svelte'; // Import Card
	import CardsContainer from './design/CardsContainer.svelte'; // Import CardsContainer
	import Modal from './design/Modal.svelte'; // Import Modal
	import LoadMoreButton from './design/LoadMoreButton.svelte';

	let multiSearchData = [];
	let searchQuery = 'happiness';
	let currentPage = 1;
	let totalMultiPages = 1;
	let selectedItem = null; // Add variable to hold selected item

		// Subscribe to the movies store
	multiResults.subscribe((value) => {
		multiSearchData = value.map((movie) => ({
			// Mapping the properties you need
			id: movie.id,
			datatype: "movie",
			genre_ids: movie.genre_ids,
			title: movie.title,
			rating: movie.vote_average,
			popularity: roundPopularity(movie.popularity), // Use appropriate rating property
			backdrop_path: movie.poster_path,
			overview: movie.overview,
			release_date: formatDate(movie.release_date),
      credits: movie.id,
		}));
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

	const openModal = (item) => { // Function to open modal
		selectedItem = item;
	};

	const closeModal = () => { // Function to close modal
		selectedItem = null;
	};

	onMount(() => {
		handleSearch();
	});
</script>

<div class="page-header-container">		<p>Search All</p>
	<div class="input-and-button">
<input
	type="text"
	bind:value={searchQuery}
	placeholder="Search entire datab..."
	on:keydown={handleKeyPress}
/>

<button on:click={handleSearch} class="button-styles">go</button></div></div>

{#if multiSearchData.length > 0}

<CardsContainer>
	{#each multiSearchData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={() => openModal(item)} />
	{/each}
</CardsContainer>
<Modal selectedItem={selectedItem} close={closeModal} />
		{/if}

	{#if currentPage <= totalMultiPages}
	<LoadMoreButton onClick={loadMore} />
	{/if}
	<ReturnToTop />

