<!-- LoadTVShows.svelte -->
<script>
	import { tvShows, tvShowPageStore, totalTVShowPagesStore, getTVShows, loadMoreTVShows } from '$lib/api/tvShows.js';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import Card from '../design/Card.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Modal from '../design/Modal.svelte';
	import { roundPopularity, formatDate } from '$lib/cardUtils.js';

	let loadMoreTVShowsVisible = true;

	$: loadMoreTVShowsVisible = get(tvShowPageStore) <= get(totalTVShowPagesStore);

	onMount(() => {
		getTVShows();
	});

	let tvShowData = [];

	tvShows.subscribe((value) => {
		tvShowData = value.map((tvShow) => ({
			title: tvShow.name,
			rating: tvShow.vote_average,
			popularity: roundPopularity(tvShow.popularity),
			backdrop_path: tvShow.poster_path,
			overview: tvShow.overview,
			release_date: formatDate(tvShow.first_air_date),
			credits: tvShow.id,
		}));
	});

	let selectedItem = null;

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}
</script>

<CardsContainer>
	{#each tvShowData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />
{#if loadMoreTVShowsVisible}
	<LoadMoreButton onClick={() => loadMoreTVShows()} />
{/if}
