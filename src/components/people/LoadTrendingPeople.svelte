<!-- LoadTrendingPeople.svelte -->
<script>
  import { getTrendingPeople, trendingPeople, trendingPageNumber } from "$lib/api/trendingPeople.js";
  import { onMount } from 'svelte';
	import { prioritizeImages } from "../../lib/api/prioritizeImages";


  let trendingPeopleData = [];

  // Subscribe to the trending people store
  trendingPeople.subscribe(value => {
    trendingPeopleData = value;
  });

  // Load the first page of trending people when the component mounts
  onMount(() => {
    getTrendingPeople(trendingPageNumber);
  });

  const handleLoadNextPage = async () => {
    trendingPageNumber++; // Increment the current page number
    await getTrendingPeople(trendingPageNumber); // Fetch the next page of trending people
  };
</script>

<!-- Display the trending people -->
{#each trendingPeopleData.sort(prioritizeImages) as person}
  <div>{person.name}</div>
  <div>{person.known_for_department}</div>
  <div>{person.popularity}</div>
  <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;" />
{/each}


