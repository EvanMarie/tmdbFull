<script>
  import {
    getTrendingTVShows,
    trendingTVShows,
    trendingTVShowPageNumber
  } from '$lib/api/trendingTVShows.js';
  import { onMount, afterUpdate } from 'svelte';

  let trendingTVShowData = [];
  let trendingTimeWindow = 'day'; // Initialize the trendingTimeWindow variable with 'day'

  // Subscribe to the trending TV shows store
  trendingTVShows.subscribe((value) => {
    trendingTVShowData = value;
  });

  onMount(() => {
    trendingTVShowPageNumber.set(1); // Reset the page number when the component mounts
    getTrendingTVShows(trendingTimeWindow); // Load trending TV shows for the initial time window when the component mounts
  });

  afterUpdate(() => {
    getTrendingTVShows(trendingTimeWindow);
  });

  $: {
    if (trendingTimeWindow) { // If the time window is defined
      trendingTVShowPageNumber.set(1); // Reset the page number when time window changes
      getTrendingTVShows(trendingTimeWindow);
    }
  }

  const handleLoadTrending = () => {
    getTrendingTVShows(trendingTimeWindow);
  };

  const handleTimeWindowChange = (event) => {
    trendingTimeWindow = event.target.value;
    console.log('trendingTimeWindow:', trendingTimeWindow); // Add this log statement
  };
</script>

<!-- The rest of your component's markup goes here -->

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
{#each trendingTVShowData as show}
	<div>{show.name}</div>
	<div>{show.first_air_date}</div>
	<div>{show.popularity}</div>
	<img
		src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
		alt={show.name}
		style="width: 300px;"
	/>
{/each}

<!-- Next Page button -->
<!-- <button on:click={handleLoadTrending}>Next Page</button> -->
