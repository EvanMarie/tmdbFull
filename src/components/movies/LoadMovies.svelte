<!-- LoadMovies.svelte -->

<script>
	import { getMovies, movies, moviePageStore, totalMoviePagesStore } from '$lib/api/movies.js'; // Verify the import path is correct
	import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import { get } from 'svelte/store';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import Card from '../design/Card.svelte';
	import { roundPopularity, formatDate, findGenreName } from '$lib/cardUtils.js';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Modal from '../design/Modal.svelte';

	
	function handleItemClick(event) {
    selectedItem = event.detail.item;
}

	function closeModal() {
		selectedItem = null;
	}

	let loadMoreVisible = true;

	$: loadMoreVisible = get(moviePageStore) <= get(totalMoviePagesStore);

	let movieData = [];

	onMount(() => {
		getMovies();
	});

	const handleLoadMovies = () => {
		getMovies();
	};

	// Subscribe to the movies store
	movies.subscribe((value) => {
		movieData = value.map((movie) => ({
			// Mapping the properties you need
			title: movie.title,
			rating: movie.vote_average,
			popularity: roundPopularity(movie.popularity), // Use appropriate rating property
			backdrop_path: movie.poster_path,
			overview: movie.overview,
			release_date: formatDate(movie.release_date)
		}));
	});

	let selectedItem = null;
	let myModal;
</script>

<!-- Display the movies -->

<CardsContainer>
	{#each movieData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick}/>
	{/each}
 <Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />
{#if loadMoreVisible}
	<LoadMoreButton onClick={() => getMovies(true)} />
{/if}
