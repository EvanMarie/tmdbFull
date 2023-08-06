<!-- LoadTrendingPeople.svelte -->

<script>
    import { getTrendingPeople, trendingPeople, trendingPageNumber } from "$lib/api/trendingPeople.js";
    import { onMount } from 'svelte';

    let trendingPeopleData = [];

    // Subscribe to the trending people store
    trendingPeople.subscribe(value => {
        trendingPeopleData = value;
    });

    const handleLoadTrending = () => {
        getTrendingPeople();
    };

    const handleNextPage = () => {
        trendingPageNumber += 1; // Increment the trending page number
        getTrendingPeople(); // Load the next page of trending people
    };

    onMount(() => {
        // Initially, do not load any trending people until the "Load Trending People" button is clicked
    });
</script>


<!-- Display the trending people -->
{#each trendingPeopleData as person}
    <div>{person.name}</div>
    <div>{person.known_for_department}</div>
    <div>{person.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;"/>
{/each}

<!-- Next Page button -->
<button on:click={handleNextPage}>Next Page</button>
