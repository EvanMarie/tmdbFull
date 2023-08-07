<!-- SearchMovies.svelte -->

<script>
  import { searchMovies, movieResults, searchMoviePageStore, totalMoviePagesStore } from '$lib/api/movies.js';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
  
  let movieSearchData = [];
  let searchQuery = '';
  let currentPage = 1; 
  let totalMoviePages = 1;

  // Subscribe to the search results store
  movieResults.subscribe(value => {
    movieSearchData = value;
  });

  searchMoviePageStore.subscribe(value => currentPage = value); 
  totalMoviePagesStore.subscribe(value => totalMoviePages = value); 

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const loadMoreMovies = () => {
    searchMovies(searchQuery, true);
  };
</script>

<input
  type="text"
  bind:value={searchQuery}
  placeholder="Search for a movie..."
  on:keydown={handleKeyPress}
/>

<button on:click={handleSearch}>Search Movies</button>

{#if movieSearchData.length > 0}
  {#each movieSearchData.sort(prioritizeImages) as movie}
    <div>{movie.title}</div>
    <div>{movie.release_date}</div>
    <div>{movie.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
  {/each}

  {#if currentPage <= totalMoviePages}
    <button on:click={loadMoreMovies} class="button-styles">Load More Movies</button>
  {/if}
{:else}
  <p>No search results to display.</p>
{/if}
