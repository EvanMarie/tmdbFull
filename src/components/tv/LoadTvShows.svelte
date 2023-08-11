<!-- LoadTVShows.svelte -->

<script>
	import {
		tvShows,
		tvShowPageStore,
		totalTVShowPagesStore,
		getTVShows,
	} from '$lib/api/tvShows.js';
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
			id: tvShow.id,
			datatype: 'tv',
			genre_ids: tvShow.genre_ids,
			rating: tvShow.vote_average,
			popularity: roundPopularity(tvShow.popularity),
			backdrop_path: tvShow.poster_path,
			overview: tvShow.overview,
			release_date: formatDate(tvShow.first_air_date),
			credits: tvShow.id
		}));
	});

	let selectedItem = null;

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}

	let selectedFilter = 'top_rated';

	$: {
		// Reset page number and load shows whenever the filter changes
		tvShowPageStore.set(1);
		getTVShows(selectedFilter);
	}
</script>

<div class="page-header-container">
		<div class="input-and-button"><h1>Explore TV</h1>
</div>
<div class="select-container">
	<select bind:value={selectedFilter} on:change={() => getTVShows(selectedFilter)}>
		<option value="airing_today">Airing Today</option>
		<option value="on_the_air">On the Air</option>
		<option value="popular">Popular</option>
		<option value="top_rated">Top Rated</option>
	</select></div>
</div>

<CardsContainer>
	{#each tvShowData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />
{#if loadMoreTVShowsVisible}
	<LoadMoreButton onClick={() => getTVShows(selectedFilter, true)} />
{/if}
