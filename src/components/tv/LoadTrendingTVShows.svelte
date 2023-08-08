<!-- LoadTrendingTVShows.svelte -->

<script>
	import {
		getTrendingTVShows,
		trendingTVShows,
		trendingTVShowPageNumber
	} from '$lib/api/trendingTVShows.js';
	import { onMount, afterUpdate } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import { totalTrendingTVShowPages } from '$lib/api/trendingTVShows.js';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';

  let totalTrendingPages = 0;
  let trendingTVShowData = [];
  let trendingTimeWindow = 'day';
  let initialized = false;

  onMount(() => {
    trendingTVShowPageNumber.set(1);
    getTrendingTVShows(trendingTimeWindow);
    initialized = true;
  });

  $: if (trendingTimeWindow && initialized) {
    trendingTVShowPageNumber.set(1);
    getTrendingTVShows(trendingTimeWindow);
  }

  trendingTVShows.subscribe((value) => {
    trendingTVShowData = value;
  });

  totalTrendingTVShowPages.subscribe((value) => {
    totalTrendingPages = value;
  });

  const handleLoadTrending = () => {
    getTrendingTVShows(trendingTimeWindow);
  };

  const handleTimeWindowChange = (event) => {
    trendingTimeWindow = event.target.value;
    console.log('trendingTimeWindow:', trendingTimeWindow);
  };

  const handleLoadMoreTrending = () => {
    getTrendingTVShows(trendingTimeWindow, true);
  };
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

<button on:click={handleLoadTrending}>Load Trending TV Shows</button>

<!-- Display the trending TV shows -->
{#each trendingTVShowData.sort(prioritizeImages) as show}
	<div>{show.name}</div>
	<div>{show.first_air_date}</div>
	<div>{show.popularity}</div>
	<img
		src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
		alt={show.name}
		style="width: 300px;"
	/>
{/each}

<ReturnToTop />

{#if $trendingTVShowPageNumber < totalTrendingPages}
<LoadMoreButton onClick={handleLoadMoreTrending} />
{/if}
