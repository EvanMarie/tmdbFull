<script>
	import { getTVShowsByGenre } from './tvshows';
	import { prioritizeImages } from '../lib/api/prioritizeimages.js';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';
	import TVGenreSelector from './TVGenreSelector.svelte';
	import CardsContainer from '../design/CardsContainer.svelte';
	import Card from '../design/Card.svelte';
	import Modal from '../design/Modal.svelte';
	import NoMoreResults from '../design/NoMoreResults.svelte';

	let showsByGenreData = [];
	let genreId = 10765; // Assume this is the ID for "Sci-fi and Fantasy"
	let page = 1;
	let showButton = false;
	let moreShows = true;
	let selectedItem = null;

	const handleGenreSelect = (event) => {
		showsByGenreData = [];
		page = 1;
		genreId = event.detail.genreId;
		showButton = false;
		moreShows = true;
		loadShowsByGenre();
	};

	const loadShowsByGenre = async () => {
		const newShows = await getTVShowsByGenre(genreId, page);
		showsByGenreData = [
			...showsByGenreData,
			...newShows.map((show) => ({
				title: show.name,
				id: show.id,
				datatype: 'tv',
				genre_ids: show.genre_ids,
				rating: show.vote_average, // Use appropriate rating property
				popularity: show.popularity,
				backdrop_path: show.poster_path,
				overview: show.overview,
				release_date: show.first_air_date,
				credits: show.id // or any other identifier
			}))
		];
		showButton = true;
		if (newShows.length < 60) {
			moreShows = false;
		}
		page += 3;
	};

	loadShowsByGenre(); // Load shows for the initial genre

	function handleItemClick(event) {
		selectedItem = event.detail.item;
	}

	function closeModal() {
		selectedItem = null;
	}
</script>

<div class="page-header-container">
	<p>TV Genres</p>
	<div class="input-and-button">
		<TVGenreSelector {genreId} on:genreselect={handleGenreSelect} />
	</div>
</div>

<CardsContainer>
	{#each showsByGenreData.sort(prioritizeImages) as item (item.credits)}
		<Card {item} on:itemClick={handleItemClick} />
	{/each}
	{#if selectedItem}
		<Modal {selectedItem} close={closeModal} />
	{/if}
</CardsContainer>
<ReturnToTop />
{#if showButton && moreShows}
	<LoadMoreButton onClick={loadShowsByGenre} />

{/if}
