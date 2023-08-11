<!-- MovieGenres.svelte -->

<script>
	import MovieGenreSelector from './MovieGenreSelector.svelte';
	import {
		getMoviesByGenre,
		moviesByGenreStore,
		genrePageStore,
		totalGenrePagesStore
	} from '../lib/api/movies.js';
	import { roundPopularity, formatDate } from '../lib/cardutils.js';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import { prioritizeImages } from '../lib/api/prioritizeimages.js';

	// Other code remains the same...

	let moreMovies = true;

	onMount(() => {
		loadMoviesByGenre();
	});

	$: moreMovies = get(genrePageStore) <= get(totalGenrePagesStore);

	let movieData = [];

	let moviesByGenre = [];
	let page = 1;
	let showButton = false;
	let genreId = 10402;

	onMount(() => {
		loadMoviesByGenre();
	});

	const handleGenreSelect = (event) => {
		moviesByGenre = [];
		movieData = []; // Reset movie data
		page = 1;
		genreId = event.detail.genreId;
		showButton = false;
		moreMovies = true;
		loadMoviesByGenre();
	};

	const loadMoviesByGenre = async () => {
		const newMovies = await getMoviesByGenre(genreId, page);
		// Transforming the data here directly
		movieData = [
			...movieData,
			...newMovies.map((movie) => ({
				title: movie.title,
				id: movie.id,
				datatype: 'movie',
				genre_ids: movie.genre_ids,
				rating: movie.vote_average,
				popularity: roundPopularity(movie.popularity), // Use appropriate rating property
				backdrop_path: movie.poster_path,
				overview: movie.overview,
				release_date: formatDate(movie.release_date),
				credits: movie.id
			}))
		];
		showButton = true;
		if (newMovies.length < 60) {
			moreMovies = false;
		}
		page += 3;
	};

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}

	const handleLoadMovies = () => {
		loadMoviesByGenre();
	};

	let selectedItem = null;
</script>


<div class="page-header-container">
	<p>Movie Genres</p>
		<div class="input-and-button">
<MovieGenreSelector on:genreselect={handleGenreSelect} /></div>	</div>	

<CardsContainer>
	{#each movieData.sort(prioritizeImages) as item}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	<Modal {selectedItem} close={closeModal} />
</CardsContainer>
<ReturnToTop />
{#if moreMovies}
	<LoadMoreButton onClick={() => loadMoviesByGenre(true)} />
{/if}
