<script>
	import MovieGenreSelector from './MovieGenreSelector.svelte';
	import { getMoviesByGenre } from '$lib/api/movies.js';

	let moviesByGenre = [];

	const handleGenreSelect = async (event) => {
		moviesByGenre = await getMoviesByGenre(event.detail.genreId);
	};

     const loadMoreMovies = () => {
    getMoviesByGenre(genre, true);
  };
</script>

<MovieGenreSelector on:genreselect={handleGenreSelect} />

<!-- Display the movies from the selected genre -->
{#each moviesByGenre as movie}
	<div>{movie.title}</div>
	<div>{movie.release_date}</div>
	<div>{movie.popularity}</div>
	<img
		src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		alt={movie.title}
		style="width: 300px;"
	/>
{/each}


