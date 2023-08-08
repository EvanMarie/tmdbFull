<!-- LoadMovies.svelte -->

<script>
  import { getMovies, movies, moviePageStore, totalMoviePagesStore, } from '$lib/api/movies.js'; // Verify the import path is correct
  import { onMount } from 'svelte';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import { get } from 'svelte/store';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import Card from '../design/Card.svelte';
  import { truncateText, roundPopularity, formatDate } from '$lib/cardUtils.js';
	import CardsContainer from '../design/CardsContainer.svelte';

	let loadMoreVisible = true;

	$: loadMoreVisible = get(moviePageStore) <= get(totalMoviePagesStore);

  let movieData = [];


  onMount(() => {
    getMovies();
  });

  const handleLoadMovies = () => {
    getMovies();
  };

  console.log(movieData[0])

    // Subscribe to the movies store
  movies.subscribe(value => {
    movieData = value.map(movie => ({
      // Mapping the properties you need
      title: movie.title,
      rating: movie.vote_average, 
      popularity: roundPopularity(movie.popularity), // Use appropriate rating property
      backdrop_path: movie.poster_path,
      shortOverview: truncateText(movie.overview, 70), // Add appropriate short overview property
      releaseDate: formatDate(movie.release_date),
    }));
  });
</script>



<!-- Display the movies -->

<CardsContainer>
{#each movieData.sort(prioritizeImages) as item}

<Card {item} />
{/each}
</CardsContainer>
	<ReturnToTop />
{#if loadMoreVisible}
<LoadMoreButton onClick={() => getMovies(true)} />
{/if}