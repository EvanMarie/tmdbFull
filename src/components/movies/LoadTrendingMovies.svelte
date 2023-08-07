<!-- LoadTrendingMovies.svelte -->

<script>
  import {
    getTrendingMovies,
    trendingMovies,
    trendingMoviePageNumber
  } from '$lib/api/trendingMovies.js';
  import { onMount, afterUpdate } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';

  let trendingMovieData = [];
  let trendingTimeWindow = 'day'; // Initialize the trendingTimeWindow variable with 'day'

  // Subscribe to the trending movies store
  trendingMovies.subscribe((value) => {
    trendingMovieData = value;
  });

  onMount(() => {
    trendingMoviePageNumber.set(1); // Reset the page number when the component mounts
    getTrendingMovies(trendingTimeWindow); // Load trending movies for the initial time window when the component mounts
  });

  afterUpdate(() => {
    getTrendingMovies(trendingTimeWindow);
  });

  $: {
    if (trendingTimeWindow) { // If the time window is defined
      trendingMoviePageNumber.set(1); // Reset the page number when time window changes
      getTrendingMovies(trendingTimeWindow);
    }
  }

  const handleLoadTrending = () => {
    getTrendingMovies(trendingTimeWindow);
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

<button on:click={handleLoadTrending}>Load Trending Movies</button>

<!-- Display the trending movies -->
{#each trendingMovieData.sort(prioritizeImages) as movie}
	<div>{movie.title}</div>
	<div>{movie.release_date}</div>
	<div>{movie.popularity}</div>
	<img
		src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		alt={movie.title}
		style="width: 300px;"
	/>
{/each}

<!-- Next Page button -->
<button on:click={handleLoadTrending}>Next Page</button>
