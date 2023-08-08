<!-- LoadPeople.svelte -->

<script>
    import { getPeople, people, pageNumber, totalPopularPagesStore } from "$lib/api/popularPeople.js"
    import { onMount } from 'svelte';
	import { prioritizeImages } from "../../lib/api/prioritizeImages";
	import ReturnToTop from "../design/ReturnToTop.svelte";
	import LoadMoreButton from "../design/LoadMoreButton.svelte";

	let peopleData = [];
	let totalPopularPages;

	// Subscribe to the popular people store
	people.subscribe(value => {
		peopleData = value;
	});

	totalPopularPagesStore.subscribe((value) => {
		totalPopularPages = value;
	});

	// Load the first 3 pages of people when the component mounts
	onMount(() => {
		getPeople();
	});

	const handleLoadMore = () => {
		getPeople(true); // Pass true to indicate a "Load More" request
	};
</script>


<!-- Display the popular people -->
{#each peopleData.sort(prioritizeImages) as person}
    <div>{person.name}</div>
    <div>{person.known_for_department}</div>
    <div>{person.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} style="width: 300px;"/>
{/each}

<ReturnToTop/>
{#if $pageNumber < totalPopularPages}
<LoadMoreButton onClick={getPeople}/>
{/if}