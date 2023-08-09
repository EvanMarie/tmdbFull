<!-- MovieGenres.svelte -->

<script>
	import MovieGenreSelector from './MovieGenreSelector.svelte';
	import { getMoviesByGenre } from '$lib/api/movies.js';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import { onMount } from 'svelte';

	let moviesByGenre = [];
	let page = 1;
	let showButton = false;
	let moreMovies = true;
	let genreId = 10402;

	onMount(() => {
		loadMoviesByGenre();
	});

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

	<ReturnToTop />
{#if showButton && moreMovies}
<LoadMoreButton onClick={loadMoviesByGenre} />
{/if}
