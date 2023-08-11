<!-- SearchPeople.svelte -->

<script>
	import { searchPeople, searchResults, totalSearchPagesStore } from '$lib/api/popularpeople.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '$lib/api/prioritizeimages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import SearchButton from '../design/SearchButton.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';

	let searchQuery = 'Chaplin'; // Set the initial search query to "Chaplin"
	let searchPageNumber = 1;
	let searchResultsData = [];
	let totalSearchPages = 1;
	let peopleData = [];

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	let selectedItem = null;

	function closeModal() {
		selectedItem = null;
	}

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


	searchResults.subscribe((value) => {
		peopleData = value.map((person) => ({
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
	});


</script>

<div class="page-header-container">
	<p>Search People</p>
	<form on:submit|preventDefault={handleSearch}>
		<div class="input-and-button">
			<input type="text" bind:value={searchQuery} placeholder="Search for an actor..." />
			<SearchButton />
		</div>
	</form>
</div>

<!-- Display the search results -->
{#if searchResultsData.length > 0}
	<CardsContainer>
		{#each peopleData.sort(prioritizeImages) as item}
			<Card {item} on:itemClick={handleItemClick} />
		{/each}
		<Modal {selectedItem} close={closeModal} />
	</CardsContainer>

	<ReturnToTop />
	{#if searchResultsData.length > 0 && searchPageNumber < totalSearchPages}
		<LoadMoreButton onClick={handleLoadMore} />
	{/if}
{:else}
	<p>No search results to display.</p>
{/if}