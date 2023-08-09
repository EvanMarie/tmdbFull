<!--TVGenreSelector.svelte -->

<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import axios from 'axios';

    export let selectedGenre = 10765; // Assume this is the ID for "Sci-fi and Fantasy"

    let genres = [];
    let selectedGenreName = "Select a genre";

    // Dispatch an event when a genre is selected
    const dispatch = createEventDispatcher();

    // Function to get genre name by ID
    const getGenreNameById = (id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Select a genre";
    };

    const handleGenreChange = (event) => {
        selectedGenre = parseInt(event.target.value, 10);
        dispatch('genreselect', { genreId: selectedGenre });
    };

    onMount(async () => {
        const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/tv/list?language=en-US',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        };
        try {
            const response = await axios.request(options);
            genres = response.data.genres;
            selectedGenreName = getGenreNameById(selectedGenre); // Get the name for the initially selected genre
        } catch (error) {
            console.error(error);
        }
    });
</script>

<select bind:value={selectedGenre} on:change={handleGenreChange}>
    <option value="">{selectedGenreName}</option>
    {#each genres as genre}
        <option value={genre.id}>{genre.name}</option>
    {/each}
</select>

