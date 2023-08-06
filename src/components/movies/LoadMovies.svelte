<!-- LoadMovies.svelte -->

<script>
  import { getMovies, movies } from '$lib/api/movies.js'; // Verify the import path is correct
  import { onMount } from 'svelte';

  let movieData = [];

  // Subscribe to the movies store
  movies.subscribe(value => {
    movieData = value;
  });

  onMount(() => {
    getMovies();
  });

  const handleLoadMovies = () => {
    getMovies();
  };
</script>

<button on:click={handleLoadMovies}>More Movies</button>

<!-- Display the movies -->
{#each movieData as movie}
  <div>{movie.title}</div>
  <div>{movie.release_date}</div>
  <div>{movie.popularity}</div>
  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
{/each}
