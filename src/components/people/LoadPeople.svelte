<!-- LoadPeople.svelte -->

<script>
    import { getPeople, people } from "$lib/api/popularPeople.js"
    import { onMount } from 'svelte';

    let peopleData = [];

    // Subscribe to the popular people store
    people.subscribe(value => {
        peopleData = value;
    });

    // Load the first page of people when the component mounts
    onMount(() => {
        getPeople();
    });
</script>

<button on:click={getPeople}>Load Next Page</button>

<!-- Display the popular people -->
{#each peopleData as person}
    <div>{person.name}</div>
    <div>{person.known_for_department}</div>
    <div>{person.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;"/>
{/each}
