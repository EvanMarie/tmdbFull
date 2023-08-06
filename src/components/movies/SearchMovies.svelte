<!-- SearchMovies.svelte -->

<script>
  import { searchMovies, movieResults } from '$lib/api/movies.js';
  import { onMount } from 'svelte';

  let movieSearchData = [];
  let searchQuery = '';

  // Subscribe to the search results store
  movieResults.subscribe(value => {
    movieSearchData = value;
  });

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  // Handle search when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Custom sorting function to prioritize movies with images first
  const prioritizeImages = (a, b) => {
    if (a.poster_path && !b.poster_path) {
      return -1;
    } else if (!a.poster_path && b.poster_path) {
      return 1;
    } else {
      return 0;
    }
  };
</script>

<input
  type="text"
  bind:value={searchQuery}
  placeholder="Search for a movie..."
  on:keydown={handleKeyPress}
/>

<button on:click={handleSearch}>Search Movies</button>

<!-- Display the movie search results -->
{#if movieSearchData.length > 0}
  {#each movieSearchData.sort(prioritizeImages) as movie}
    <div>{movie.title}</div>
    <div>{movie.release_date}</div>
    <div>{movie.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
  {/each}
{:else}
  <p>No search results to display.</p>
{/if}
