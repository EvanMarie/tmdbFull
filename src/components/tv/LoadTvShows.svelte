<!-- LoadTVShows.svelte -->
<script>
	import { tvShows, tvShowPageStore, totalTVShowPagesStore, getTVShows, loadMoreTVShows } from '$lib/api/tvShows.js';
  import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';

	let loadMoreTVShowsVisible = true;

	// Reactive statement to control the visibility of the "Load more TV shows" button
	$: loadMoreTVShowsVisible = get(tvShowPageStore) <= get(totalTVShowPagesStore);

	// Fetch the initial TV shows when the component mounts
	onMount(() => {
		getTVShows();
	});
</script>


<!-- Display the TV shows -->
<!-- Display the TV shows -->
{#each $tvShows.sort(prioritizeImages) as tvShow}
  <div>{tvShow.name}</div>
  <div>{tvShow.first_air_date}</div>
  <div>{tvShow.popularity}</div>
  <div>{tvShow.vote_average}</div>
  <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} style="width: 300px;" />
{/each}

	<ReturnToTop />
{#if loadMoreTVShowsVisible}
<LoadMoreButton onClick={loadMoreTVShows()} />
{/if}
