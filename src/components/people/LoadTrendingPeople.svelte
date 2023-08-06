<!-- LoadTrendingPeople.svelte -->

<script>
    import { getTrendingPeople, trendingPeople } from "$lib/api/trendingPeople.js";
    import { onMount } from 'svelte';

    let trendingPeopleData = [];

    // Subscribe to the trending people store
    trendingPeople.subscribe(value => {
        trendingPeopleData = value;
    });

    // Load the first page of trending people when the component mounts
    onMount(() => {
        getTrendingPeople();
    });

    const handleLoadTrending = () => {
        getTrendingPeople();
    };
</script>

<button on:click={handleLoadTrending}>Load Trending People</button>

<!-- Display the trending people -->
{#each trendingPeopleData as person}
    <div>{person.name}</div>
    <div>{person.known_for_department}</div>
    <div>{person.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;"/>
{/each}
