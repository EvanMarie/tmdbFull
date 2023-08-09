<!-- LoadPeople.svelte -->

<script>
	import { getPeople, people, pageNumber, totalPopularPagesStore } from '$lib/api/popularPeople.js';
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';

	let peopleData = [];
	let totalPopularPages;

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	let selectedItem = null;

	function closeModal() {
		selectedItem = null;
	}

	totalPopularPagesStore.subscribe((value) => {
		totalPopularPages = value;
	});

	// Load the first 3 pages of people when the component mounts
	onMount(() => {
		getPeople();
	});

	const handleLoadMore = () => {
		getPeople(true); // Pass true to indicate a "Load More" request
	};

	people.subscribe((value) => {
		peopleData = value.map((person) => ({
			// Mapping the properties you need
			id: person.id,
			datatype: 'person',
			title: person.name,
			popularity: person.popularity,
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

	console.log(people);
</script>

<!-- Display the popular people -->
<div class="page-header-container">
	<h1>Explore People</h1>
		</div>
<CardsContainer>
	{#each peopleData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>

<ReturnToTop />
{#if $pageNumber < totalPopularPages}
	<LoadMoreButton onClick={getPeople} />
{/if}
