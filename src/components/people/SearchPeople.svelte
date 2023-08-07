<!-- SearchPeople.svelte -->

<script>
    import { searchPeople, searchResults } from "$lib/api/popularPeople.js"
    import { onMount } from 'svelte';
	import { prioritizeImages } from "../../lib/api/prioritizeImages";

    let searchQuery = '';
    let searchPageNumber = 1;
    let searchResultsData = [];

    const handleSearch = async () => {
        searchPageNumber = 1; // Reset search page number when starting a new search
        searchResultsData = []; // Clear existing search results
        await searchPeople(searchQuery);
    }

    // Subscribe to the search results store
    searchResults.subscribe(value => {
        searchResultsData = value;
    });

    // Load the first page of search results when the component mounts
    onMount(() => {
        // Initially, do not load any search results until the user submits the form
    });

</script>

<form on:submit|preventDefault={handleSearch}>
    <input type="text" bind:value={searchQuery} placeholder="Search for an actor..." />
    <button type="submit">Search</button>
</form>

<!-- Display the search results -->
{#if searchResultsData.length > 0}
    {#each searchResultsData.sort(prioritizeImages) as person}
        <div>{person.name}</div>
        <div>{person.known_for_department}</div>
        <div>{person.popularity}</div>
        <img src={`https://image.tmdb.org/t/p/w500${person.profile_path || person.poster_path}`} alt={person.name} style="width: 300px;"/>
    {/each}
{:else}
    <p>No search results to display.</p>
{/if}
