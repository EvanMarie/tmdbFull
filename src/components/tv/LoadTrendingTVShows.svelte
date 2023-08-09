<script>
	import {
		getTrendingTVShows,
		trendingTVShows,
		trendingTVShowPageNumber,
		totalTrendingTVShowPages
	} from '$lib/api/trendingTVShows.js';
	import { onMount, afterUpdate } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import { roundPopularity, formatDate } from '$lib/cardUtils.js';

	let totalTrendingPages = 0;
	let trendingTVShowData = [];
	let trendingTimeWindow = 'day';
	let initialized = false;
	let tvShowData = [];
	let selectedItem = null;

	onMount(() => {
		trendingTVShowPageNumber.set(1);
		getTrendingTVShows(trendingTimeWindow);
		initialized = true;
	});

	$: if (trendingTimeWindow && initialized) {
		trendingTVShowPageNumber.set(1);
		getTrendingTVShows(trendingTimeWindow);
	}

	// Subscribe to the trending TV shows store
	trendingTVShows.subscribe((value) => {
		tvShowData = value.map((show) => ({
			title: show.name,
			rating: show.vote_average,
			popularity: roundPopularity(show.popularity),
			backdrop_path: show.poster_path,
			overview: show.overview,
			release_date: formatDate(show.first_air_date),
			credits: show.id
		}));
	});

	totalTrendingTVShowPages.subscribe((value) => {
		totalTrendingPages = value;
	});

	const handleLoadMoreTrending = () => {
		getTrendingTVShows(trendingTimeWindow, true);
	};

	const handleTimeWindowChange = (event) => {
		trendingTimeWindow = event.target.value;
	};

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}
</script>

<div>
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

<CardsContainer>
	{#each tvShowData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />

{#if $trendingTVShowPageNumber < totalTrendingPages}
	<LoadMoreButton onClick={handleLoadMoreTrending} />
{/if}
