<!-- LoadMovies.svelte -->

<script>
  import { getMovies, movies, moviePageStore, totalMoviePagesStore, } from '$lib/api/movies.js'; // Verify the import path is correct
  import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import { get } from 'svelte/store';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';

	let loadMoreVisible = true;

	$: loadMoreVisible = get(moviePageStore) <= get(totalMoviePagesStore);

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



<!-- Display the movies -->
{#each movieData.sort(prioritizeImages) as movie}
  <div>{movie.title}</div>
  <div>{movie.release_date}</div>
  <div>{movie.popularity}</div>
  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style="width: 300px;" />
{/each}

	<ReturnToTop />
{#if loadMoreVisible}
<LoadMoreButton onClick={() => getMovies(true)} />
{/if}