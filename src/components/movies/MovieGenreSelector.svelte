<!-- GenreSelector.svelte -->
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import axios from 'axios';

    let genres = [];
    let selectedGenre = '';

    // Dispatch an event when a genre is selected
    const dispatch = createEventDispatcher();

    onMount(async () => {
        const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        };
        try {
            const response = await axios.request(options);
            genres = response.data.genres;
        } catch (error) {
            console.error(error);
        }
    });

    const handleGenreChange = (event) => {
        selectedGenre = event.target.value;
        dispatch('genreselect', { genreId: selectedGenre });
    };
</script>

<select on:change={handleGenreChange}>
    <option value="">Select a genre</option>
    {#each genres as genre}
        <option value={genre.id}>{genre.name}</option>
    {/each}
</select>
