<!-- TVGenres.svelte -->

<script>
	import { getTVShowsByGenre } from '$lib/api/tvshows.js';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
	import LoadMoreButton from '../design/LoadMoreButton.svelte';
	import ReturnToTop from '../design/ReturnToTop.svelte';
    import TVGenreSelector from './TVGenreSelector.svelte';
	

	let showsByGenre = [];
	let genreId = 10765; // Assume this is the ID for "Sci-fi and Fantasy"
	let page = 1;
	let showButton = false;
	let moreShows = true;

	const handleGenreSelect = (event) => {
		showsByGenre = [];
		page = 1;
		genreId = event.detail.genreId;
		showButton = false;
		moreShows = true;
		loadShowsByGenre();
	};

	const loadShowsByGenre = async () => {
		const newShows = await getTVShowsByGenre(genreId, page);
		showsByGenre = [...showsByGenre, ...newShows];
		showButton = true;
		if (newShows.length < 60) {
			moreShows = false;
		}
		page += 3;
	};

	loadShowsByGenre(); // Load shows for the initial genre
</script>

<TVGenreSelector {genreId} on:genreselect={handleGenreSelect} />

{#each showsByGenre.sort(prioritizeImages) as show (show.id)}
    <div>{show.name}</div>
    <div>{show.first_air_date}</div>
    <div>{show.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} style="width: 300px;" />
{/each}

<ReturnToTop />
{#if showButton && moreShows}
<LoadMoreButton onClick={loadShowsByGenre} />
{/if}
