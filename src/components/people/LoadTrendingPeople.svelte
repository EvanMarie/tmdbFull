<!-- LoadTrendingPeople.svelte -->
<script>
	import {
		getTrendingPeople,
		trendingPeople,
		trendingPageNumber,
		totalTrendingPages
	} from '../lib/api/trendingpeople.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../lib/api/prioritizeimages.js';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import NoMoreResults from '../design/NoMoreResults.svelte';

	let trendingPeopleData = [];
	let peopleData = [];

	// Subscribe to the trending people store
	trendingPeople.subscribe((value) => {
		trendingPeopleData = value;
	});

	// Load the first page of trending people when the component mounts
	onMount(() => {
		getTrendingPeople();
	});

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	let selectedItem = null;

	function closeModal() {
		selectedItem = null;
	}

	const handleLoadMoreTrending = async () => {
		await getTrendingPeople(true); // Fetch the next 3 pages of trending people
	};

	trendingPeople.subscribe((value) => {
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
	<h1>Trending People</h1>
</div>
<CardsContainer>
	{#each peopleData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>

<ReturnToTop />
{#if trendingPageNumber < $totalTrendingPages}
	<LoadMoreButton onClick={handleLoadMoreTrending} />

{/if}
