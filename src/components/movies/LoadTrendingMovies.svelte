<!-- LoadTrendingMovies.svelte -->

<script>
  import { getTrendingMovies, trendingMovies } from '$lib/api/trendingMovies.js';
  import { onMount } from 'svelte';

  let trendingMovieData = [];

  // Subscribe to the trending movies store
  trendingMovies.subscribe(value => {
    trendingMovieData = value;
  });

  onMount(() => {
    // Initially, do not load any trending movies until the "Load Trending Movies" button is clicked
  });

  const handleLoadTrending = () => {
    getTrendingMovies();
  };

  const handleNextPage = () => {
    getTrendingMovies();
  };
</script>

<button on:click={handleLoadTrending}>Load Trending Movies</button>

<!-- Display the trending movies -->
{#each trendingMovieData as movie}
  <div>{movie.title}</div>
  <div>{movie.release_date}</div>
  <div>{movie.popularity}</div>
  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
{/each}

<!-- Next Page button -->
<button on:click={handleNextPage}>Next Page</button>
