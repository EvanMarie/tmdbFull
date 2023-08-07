<!-- LoadTVShows.svelte -->
<script>
  import { getTVShows, tvShows } from '$lib/api/tvShows.js';
  import { onMount } from 'svelte';

  let tvShowData = [];

  // Subscribe to the tvShows store
  tvShows.subscribe(value => {
    tvShowData = value;
  });

  onMount(() => {
    getTVShows();
  });

  const handleLoadTVShows = () => {
    getTVShows();
  };
</script>

<button on:click={handleLoadTVShows}>More TV Shows</button>

<!-- Display the TV shows -->
{#each tvShowData as tvShow}
  <div>{tvShow.name}</div>
  <div>{tvShow.first_air_date}</div>
  <div>{tvShow.popularity}</div>
    <div>{tvShow.vote_average}</div>
  <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} style="width: 300px;" />
{/each}
