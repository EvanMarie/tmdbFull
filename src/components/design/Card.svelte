<div class="card-container">
	{#each media as movie}<div class="indicator">
			<div class="indicator-item badge">
				<div
					class="radial-progress"
					style="--value:{movie.rating}; --size:1rem; --thickness: 0.2rem;"
				>
					{movie.rating}%
				</div>
			</div>
			<div
				class="card-styles"
				style="background-color: {movie.color}"
				on:click={() => {
					selectedMovie = movie;
					document.getElementById('my_modal_4').showModal();
				}}
				on:keydown={(event) => {
					if (event.key === 'Enter') selectedMovie = movie;
				}}
				role="button"
				tabindex="0"
			>
				<figure>
					<img
						src={movie.backdrop_path
							? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
							: DEFAULT_IMAGE_URL}
						alt="Movie Poster"
						class="movie-poster"
					/>
				</figure>
				<div class="card-body">
					<p class="card-title" style="color: cyan;">{movie.title}</p>
					<p>{movie.shortOverview}</p>
				</div>
			</div>
		</div>{/each}
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.movie-poster {
		width: 250px;
		height: 200px;
		border-radius: 10px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
	}

	.card-styles {
		padding: 1rem;
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.6);
	}

	.card-styles:hover {
		cursor: pointer;
		transform: scale(1.05) rotate(-3deg);
		box-shadow: 2px 2px 30px 1px rgba(0, 0, 0, 0.8);
		transition: all 0.4s ease-in-out;
	}

	.badge {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 45px;
		width: 45px;
		padding: 3px;
		border-radius: 50%;
		background-color: cyan;
		top: 15px;
		right: 15px;
	}

	.radial-progress {
		width: 98%;
		height: 98%;
		color: black;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.radial-progress::after {
		background-color: transparent;
	}

	@media (min-width: 768px) {
		.card-container {
			flex-direction: row;
			flex-wrap: wrap;
			column-gap: 3rem;
			align-items: stretch;
		}
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

	.card-title {
		padding: 4px;
		border-radius: 5px;
		text-align: center;
		font-size: 1.1rem;
		text-shadow: 3px 2px 20px rgba(0, 0, 0, 1);
		line-height: 1.2rem;
		margin-top: 0.25rem;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 5px;
		font-size: 0.85rem;
	}
</style>
