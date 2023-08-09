<!-- Modal.svelte -->

<script>
	import { formatDate, roundPopularity, findGenreName } from '$lib/cardUtils.js';
	export let selectedItem = null;
	export let close;

	export let DEFAULT_IMAGE_URL = '/noimage.png';
	function closeModal() {
    selectedItem = null;
}
</script>

<dialog id="my_modal_4" class="modal" open={selectedItem !== null}>
	<form method="dialog" class="modal-box w-11/12">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={close}
			>✕</button
		>
		<div class="modal-stack">
			<div class="modal-image-overview">
				<img
					src={selectedItem
						? `https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path}`
						: DEFAULT_IMAGE_URL}
					alt="Movie Poster"
					class="movie-poster-modal"
				/>
				<h3 class="font-bold text-xl" style="color: cyan;">
					{selectedItem ? selectedItem.title : 'Hello!'}
				</h3>
				<p style="padding: 5px 10px;">{selectedItem ? selectedItem.overview : ''}</p>
			</div>
			{#if selectedItem}
				{#if selectedItem.genre_ids}
					<div class="genre-list">
						<span class="type" style="padding-right: 5px">Genres: </span>
						{#each selectedItem.genre_ids as genreId, index}
							<span class="genre">
								{findGenreName(genreId)}
								{#if index !== selectedItem.genre_ids.length - 1}/ {/if}
							</span>
						{/each}
					</div>
				{/if}

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
		max-width: 700px;
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
		max-width: 700px;
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
</style>
