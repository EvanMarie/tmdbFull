<!-- SearchAll.svelte -->

<script>
	import { onMount } from 'svelte';
	import {
		searchMulti,
		movieResults, // import the movie store
		personResults, // import the person store
		searchMultiPageStore,
		totalMultiPagesStore
	} from './lib/api/multisearch.js';
	import { roundPopularity, formatDate } from './lib/cardutils.js';
	import { prioritizeImages } from './lib/api/prioritizeimages.js';
	import ReturnToTop from './design/ReturnToTop.svelte';
	import Card from './design/Card.svelte'; // Import Card
	import CardsContainer from './design/CardsContainer.svelte'; // Import CardsContainer
	import Modal from './design/Modal.svelte'; // Import Modal
	import LoadMoreButton from './design/LoadMoreButton.svelte';
	import NoResults from './design/NoResults.svelte';
	import NoMoreResults from './design/NoMoreResults.svelte';

	let multiSearchData = [];
	let searchQuery = 'Tolkien';
	let currentPage = 1;
	let totalMultiPages = 1;
	let selectedItem = null; // Add variable to hold selected item
	let hasSearched = false;
	let isLoading = false; 

	// Subscribe to the movie results
	movieResults.subscribe((value) => {
		
		const movies = value.map((item) => ({
			id: item.id,
			title: item.title,
			rating: item.vote_average,
			popularity: roundPopularity(item.popularity),
			backdrop_path: item.poster_path,
			overview: item.overview,
			release_date: formatDate(item.release_date),
			datatype: 'movie'
		}));
		multiSearchData = [...movies, ...multiSearchData];
		isLoading = false; 
	});

	// Subscribe to the person results
	personResults.subscribe((value) => {
		const persons = value.map((person) => ({
			// Mapping the properties you need
			id: person.id,
			datatype: 'person',
			title: person.name,
			popularity: person.popularity,
			actorDetail: person.actorDetail,
			knownFor: person.known_for.map((item) => ({
				id: item.id,
				title: item.title,
				poster_path: item.backdrop_path,
				rating: item.vote_average,
				release_date: item.release_date
			})),
			gender: person.gender === 1 ? 'Female' : 'Male',
			known_for_department: person.known_for_department,
			backdrop_path: person.profile_path
		}));
		multiSearchData = [...persons, ...multiSearchData];
		isLoading = false;
	});

	console.log(multiSearchData);

	searchMultiPageStore.subscribe((value) => (currentPage = value));
	totalMultiPagesStore.subscribe((value) => (totalMultiPages = value));

	const handleSearch = () => {
		multiSearchData = []; // Clear the data on new search
		searchMulti(searchQuery);
		hasSearched = true; 
		isLoading = true;
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const loadMore = () => {
		searchMulti(searchQuery, true);
				isLoading = true; 
	};

	const openModal = (item) => {
		// Function to open modal
		selectedItem = item;
	};

	const closeModal = () => {
		// Function to close modal
		selectedItem = null;
	};

	onMount(() => {
		handleSearch();
		hasSearched=false;
	});
</script>

<div class="page-header-container">
	<p>Search All</p>
	<div class="input-and-button">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search entire datab..."
			on:keydown={handleKeyPress}
		/>

		<button on:click={handleSearch} class="button-styles">go</button>
	</div>
</div>

{#if multiSearchData.length > 0}
	<CardsContainer>
		{#each multiSearchData.sort(prioritizeImages) as item}
			<Card {item} on:itemClick={() => openModal(item)} />
		{/each}
	</CardsContainer>
	<Modal {selectedItem} close={closeModal} />
{:else if hasSearched}
	<NoResults />
{/if}

{#if currentPage <= totalMultiPages}
	{#if totalMultiPages > 1}
		<LoadMoreButton onClick={loadMore} />
	{/if}
{/if}
<ReturnToTop />
