<script>
	import { getTVShowsByGenre } from '$lib/api/tvshows.js';
	import { prioritizeImages } from '../../lib/api/prioritizeImages';
    import TVGenreSelector from './TVGenreSelector.svelte';
	

	let showsByGenre = [];
	let genreId = null;
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
</script>

<TVGenreSelector on:genreselect={handleGenreSelect} />

{#each showsByGenre.sort(prioritizeImages) as show (show.id)}
    <div>{show.name}</div>
    <div>{show.first_air_date}</div>
    <div>{show.popularity}</div>
    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} style="width: 300px;" />
{/each}

{#if showButton && moreShows}
	<button on:click={loadShowsByGenre}>Load More</button>
{/if}
