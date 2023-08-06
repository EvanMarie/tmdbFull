<!-- LoadPeople.svelte -->

<script>
    import { getPeople, searchPeople, people } from "$lib/api/popularPeople.js"
    let peopleData = [];
    let searchQuery = '';
    getPeople(); // Load the first page of people when the component loads

    // Subscribe to the store
    people.subscribe(value => {
        peopleData = value;
    });

    const handleSearch = () => {
        searchPeople(searchQuery);
    }
</script>

<input type="text" bind:value={searchQuery} on:input={handleSearch} placeholder="Search for an actor..." />

<button on:click={getPeople}>Load Next Page</button>

{#each peopleData as person}
    <div>{person.name}</div>
{/each}