<!-- Card.svelte -->

<script>
	import { createEventDispatcher } from 'svelte';
	import { roundPopularity, getNextColor } from '../lib/cardutils.js';

	const DEFAULT_IMAGE_URL = '/noimage.png';

	const dispatch = createEventDispatcher();

	function handleItemClick() {
		dispatch('itemClick', { item });
	}
	export let item;

	let cardColor = getNextColor();
</script>

<div class="indicator">
	<div class="indicator-item badge">
		{#if item.rating}
			<div
				class="radial-progress"
				style="--value:{item.rating * 10}; --size:1rem; --thickness: 0.2rem;"
			>
				{roundPopularity(item.rating) * 10}%
			</div>
		{/if}
		{#if item.known_for_department === 'Acting'}
			<img src="/acting.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.known_for_department === 'Directing'}
			<img src="/directing.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.known_for_department === 'Writing'}
			<img src="/writing.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.known_for_department === 'Production'}
			<img src="/producing.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.known_for_department === 'Editing'}
			<img src="/editing.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.known_for_department === 'Visual Effects'}
			<img src="/visual.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if item.datatype === 'person'}
			<img src="/person.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{:else if !item.rating}
		<img src="/confused.png" alt="person" class="indicator-icon" style="width: 30px;" />
		{/if}
	</div>
	<div
		class="card-styles"
		role="button"
		tabindex="0"
		on:click={handleItemClick}
		on:keydown={handleItemClick}
		style="background-color: {cardColor};"
	>
		<figure>
			<img
				src={item.backdrop_path
					? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
					: DEFAULT_IMAGE_URL}
				alt={item.title || 'No Title'}
				class="item-poster"
			/>
		</figure>
		<div class="card-body">
			<p
				class="card-title"
				style="color: cyan; font-size: {item.datatype === 'person'
					? '1.3rem'
					: '1.1rem'};"
			>
				{item.title}
			</p>

			<div class="truncated-overview">
				{#if item.overview}
					<p class="truncate-lines">{item.overview}</p>
				{:else}
					<div class="person-details">
						<div><span>Gender: </span><span style="color: cyan; text-shadow: 1px 1px 2px black;">{item.gender}</span></div>
						<div>
							<span>Known for: </span>
							<span style="color: cyan; text-shadow: 1px 1px 2px black;">{item.known_for_department}</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.item-poster {
		width: 200px;
		/* height: 90%; */
		object-fit: cover;
		display: block;
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
		border-radius: 5px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.6);
		background-color: var(--mediumBlue08);
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
		height: 50px;
		width: 50px;
		padding: 3px;
		border-radius: 50%;
		background-color: var(--lightPink);
		top: 15px;
		right: 15px;
	}

	.radial-progress {
		width: 99%;
		height: 99%;
		color: black;
		font-size: 0.7rem;
		font-weight: bold;
	}

	.radial-progress::after {
		background-color: transparent;
	}

	.card-title {
		padding: 4px;
		border-radius: 5px;
		text-align: center;
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
		font-size: 0.9rem;
	}

	.truncated-overview {
		height: 2.4rem; /* fallback */
	}

	.truncate-lines {
		display: -webkit-box;
		-webkit-line-clamp: 2; /* Number of lines to display */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.2rem;
	}

	.person-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left;
	}

</style>
