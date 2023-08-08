<!-- LoadTrendingPeople.svelte -->
<script>
  import { getTrendingPeople, trendingPeople, trendingPageNumber, totalTrendingPages } from "$lib/api/trendingPeople.js";
  import { onMount } from 'svelte';
  import { prioritizeImages } from "../../lib/api/prioritizeImages";
	import ReturnToTop from "../design/ReturnToTop.svelte";
	import LoadMoreButton from "../design/LoadMoreButton.svelte";

  let trendingPeopleData = [];

  // Subscribe to the trending people store
  trendingPeople.subscribe(value => {
    trendingPeopleData = value;
  });

  // Load the first page of trending people when the component mounts
  onMount(() => {
    getTrendingPeople();
  });

  const handleLoadMoreTrending = async () => {
    await getTrendingPeople(true); // Fetch the next 3 pages of trending people
  };
</script>



<!-- Display the trending people -->
{#each trendingPeopleData.sort(prioritizeImages) as person}
  <div>{person.name}</div>
  <div>{person.known_for_department}</div>
  <div>{person.popularity}</div>
  <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;" />
{/each}


<ReturnToTop/>
{#if trendingPageNumber < $totalTrendingPages}
<LoadMoreButton onClick={handleLoadMoreTrending}/>
{/if}
