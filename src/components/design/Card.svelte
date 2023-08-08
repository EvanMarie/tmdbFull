<!-- Card.svelte -->

<script>
	const DEFAULT_IMAGE_URL = '/noimage.png';
	export let item;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function handleItemClick(item) {
		dispatch('itemClick', { item });
	}
	let selectedItem = null;
</script>


	<div class="indicator">
		<div class="indicator-item badge">
			<div
				class="radial-progress"
				style="--value:{item.rating * 10}; --size:1rem; --thickness: 0.2rem;"
			>
				{item.rating * 10}%
			</div>
		</div>
		<div
			class="card-styles"
			role="button"
			tabindex="0"
		>
			<figure>
				<img src={item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}` : DEFAULT_IMAGE_URL} alt="{item.title || 'No Title'}" class="item-poster" />
			</figure>
			<div class="card-body">
				<p class="card-title" style="color: cyan;">{item.title}</p>
				<p>{item.shortOverview}</p>
			</div>
		</div>
	</div>


<style>

	.item-poster {
		width: 250px;
		/* height: 250px; */
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
		height: 45px;
		width: 45px;
		padding: 3px;
		border-radius: 50%;
		background-color: var(--lightPink);
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
