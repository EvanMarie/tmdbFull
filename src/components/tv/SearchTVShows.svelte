<script>
	import {
		searchTVShows,
		tvShows,
		tvShowPageStore,
		totalTVShowPagesStore,
		loadMoreSearchTVShows
	} from "./tvshows"
	import { onMount } from 'svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import Card from '../design/Card.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Modal from '../design/Modal.svelte';

	let tvShowData = [];
	let currentPage = 1;
	let totalTVShowPages = 1;
	let searchQuery = 'dragon'; // Set the initial search query to "dragon"
	let selectedItem = null;

	onMount(() => {
		handleSearch();
	});

	tvShows.subscribe((value) => {
		tvShowData = value.map((show) => ({
			title: show.name,
			id: show.id,
			datatype: 'tv',
			genre_ids: show.genre_ids,
			rating: show.vote_average, // Update this as needed
			popularity: show.popularity,
			backdrop_path: show.poster_path,
			overview: show.overview,
			release_date: show.first_air_date
		}));
	});

	tvShowPageStore.subscribe((value) => (currentPage = value));
	totalTVShowPagesStore.subscribe((value) => (totalTVShowPages = value));

	const handleItemClick = (event) => {
		selectedItem = event.detail.item;
	};

	const closeTVShowModal = () => {
		selectedItem = null;
	};

	
	const handleSearch = () => {
		tvShowData = []; // Clear existing search results
		searchTVShows(searchQuery); // No filter provided, so it will search all TV shows
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	onMount(() => {
		console.log('Performing initial search for "dragon"');
		handleSearch();
	});
</script>

<div class="page-header-container">
	<p>Search TV</p>
	<div class="input-and-button">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search for a TV show..."
			on:keydown={handleKeyPress}
		/>
		<button on:click={handleSearch} class="button-styles">go</button>
	</div>
</div>

<CardsContainer>
	{#each tvShowData as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	{#if selectedItem}
		<Modal {selectedItem} close={closeTVShowModal} />
	{/if}
</CardsContainer>
<ReturnToTop />
{#if currentPage < totalTVShowPages}
	<LoadMoreButton onClick={() => loadMoreSearchTVShows(searchQuery)} />
{/if}
