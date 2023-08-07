<!-- MovieGenres.svelte -->

<script>
	import MovieGenreSelector from './MovieGenreSelector.svelte';
	import { getMoviesByGenre } from '$lib/api/movies.js';

	let moviesByGenre = [];
	let genreId = null;
	let page = 1;
	let showButton = false;
	let moreMovies = true;

	const handleGenreSelect = (event) => {
		// Reset movies and page count when a new genre is selected
		moviesByGenre = [];
		page = 1;
		genreId = event.detail.genreId;
		showButton = false;
		moreMovies = true;
		loadMoviesByGenre();
	};

	const loadMoviesByGenre = async () => {
		const newMovies = await getMoviesByGenre(genreId, page);
		moviesByGenre = [...moviesByGenre, ...newMovies];
		showButton = true;
		if (newMovies.length < 60) {
			// Adjust this number based on your expectation from the API
			moreMovies = false;
		}
		page += 3;
	};

	const prioritizeImages = (a, b) => {
		if (a.poster_path && !b.poster_path) {
			return -1;
		} else if (!a.poster_path && b.poster_path) {
			return 1;
		} else {
			return 0;
		}
	};
</script>

<MovieGenreSelector on:genreselect={handleGenreSelect} />

{#each moviesByGenre.sort(prioritizeImages) as movie (movie.id)}
	<div>{movie.title}</div>
	<div>{movie.release_date}</div>
	<div>{movie.popularity}</div>
	<img
		src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		alt={movie.title}
		style="width: 300px;"
	/>
{/each}

{#if showButton && moreMovies}
	<button on:click={loadMoviesByGenre}>Load More</button>
{/if}
