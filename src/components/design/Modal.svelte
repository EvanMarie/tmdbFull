<!-- Modal.svelte -->

<script>
	import { formatDate, roundPopularity, findGenreName, truncateText } from '$lib/cardUtils.js';
	import { onMount } from 'svelte';
	export let selectedItem = null;
	export let close;

	function closeModal() {
		selectedItem = null;
	}

	const DEFAULT_IMAGE_URL = '/noimage.png';
	let genres = [];

	$: {
		if (selectedItem) {
			if (selectedItem.genre_ids) {
				(async () => {
					genres = await Promise.all(
						selectedItem.genre_ids.map((genreId) => findGenreName(genreId, selectedItem.datatype))
					);
				})();
			}
		}
	}

	onMount(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				close();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			// Cleanup function to remove the event listener when the component is destroyed
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	console.log(selectedItem);
</script>

<dialog id="my_modal_4" class="modal" open={selectedItem !== null}>
	<form method="dialog" class="modal-box w-11/12">
		<button
			class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
			on:click={close}
			style="margin-left: 20px; margin-bottom: 20px;">✕</button
		>
		<div class="modal-stack">
			<div class="modal-image-overview">
				{#if selectedItem && selectedItem.backdrop_path}
					<img
						src={`https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path}`}
						alt="Poster"
						class="movie-poster-modal"
					/>
				{:else}
					<img src={DEFAULT_IMAGE_URL} alt="Poster" class="movie-poster-modal" />
				{/if}
				<h3 class="font-bold text-xl" style="color: cyan;">
					{selectedItem ? selectedItem.title : 'Hello!'}
				</h3>
				{#if selectedItem}
					{#if selectedItem.overview}
						<p style="padding: 5px 10px;">{selectedItem.overview}</p>
					{/if}
					{#if selectedItem && selectedItem.actorDetail}
					{#if selectedItem.actorDetail.birthday}
					<p>Born on <span style="color: cyan;">{formatDate(selectedItem.actorDetail.birthday)}</span> in {selectedItem.actorDetail.place_of_birth}.</p>	
					<div class="divider" style="margin: 5px 0px;"/>
					{/if}
					{#if selectedItem.actorDetail.biography}
					<p style="padding: 5px 10px;">{selectedItem.actorDetail.biography}</p>
					{/if}

					{/if}
				{/if}
			</div>
			{#if selectedItem}
				{#if selectedItem.genre_ids}
					<div class="genre-list">
						<span class="type" style="padding-right: 5px">Genres: </span>
						{#if genres.length > 0}
							{#each genres as genre, index}
								<span class="genre">
									{genre}
									{#if index !== genres.length - 1}/ {/if}
								</span>
							{/each}
						{:else}
							<span class="genre">No genres listed</span>
						{/if}
					</div>
				{:else}
					<div class="known-for-list">
						{#if selectedItem.knownFor}
							<h3>Known For:</h3>
							<div class="known-for-container">
								{#each selectedItem.knownFor as knownFor}
									{#if knownFor.title}
										<div class="known-for-item">
											<p class="known-for-title">{truncateText(knownFor.title)}</p>
											{#if knownFor.poster_path}
												<img
													src={`https://image.tmdb.org/t/p/w500${knownFor.poster_path}`}
													alt="Poster"
													class="known-for-poster"
												/>
											{:else}
												<img src={DEFAULT_IMAGE_URL} alt="Poster" class="known-for-poster" />
											{/if}
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				{#if selectedItem.release_date}
					<div class="stats">
						<div class="stat">
							<div class="type">Rating</div>
							<div class="value">{selectedItem ? selectedItem.rating : ''} / 10</div>
						</div>
						<div class="stat">
							<div class="type">Release</div>
							<div class="value">{selectedItem ? formatDate(selectedItem.release_date) : ''}</div>
						</div>
						<div class="stat">
							<div class="type">Popularity</div>
							<div class="value">
								{selectedItem ? roundPopularity(selectedItem.popularity) : ''}
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</form>
	<div class="modal-backdrop">
		<button on:click={closeModal} on:keydown={closeModal}>close</button>
	</div>
</dialog>

<style>
	.movie-poster-modal {
		width: 250px;
		height: 200px;
		border-radius: 10px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
	}

	.modal-image-overview {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.modal-stack {
		display: flex;
		max-width: 800px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.modal-backdrop {
		background-color: rgba(0, 0, 0, 0.7); /* You can adjust the opacity here */
		backdrop-filter: blur(5px);
	}

	.modal-box {
		width: 95%;
		max-width: 800px;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);
	}

	.movie-poster-modal {
		width: 250px;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: 10px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
	}

	.modal p {
		margin: 0;
		padding: 0;
		font-size: 1.1rem;
	}

	.type {
		color: cyan;
	}

	.stats {
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
	}

	.known-for-list {
		width: 100%;
		text-align: left;
	}

	.known-for-container {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		gap: 1rem;
		color: cyan;
	}

	.known-for-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.known-for-poster {
		width: 200px;
		object-fit: cover;
		display: block;
		border-radius: 5px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
	}

	@media (min-width: 768px) {
		.modal-image-overview {
			display: block;
		}
		.movie-poster-modal {
			float: left;
			margin-right: 1rem;
		}

		.stats {
			font-size: 1rem;
		}
	}

	@media (min-width: 1080px) {
		.known-for-container {
			flex-direction: row;
		}
	}
</style>
