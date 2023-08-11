<div class="cards-container">
	<slot />
</div>

<style>
	.cards-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 2rem 2rem 2rem 5rem;
	}

	@media (min-width: 800px) {
		.cards-container {
			flex-direction: row;
			flex-wrap: wrap;
			column-gap: 3rem;
			align-items: stretch;
			padding: 2rem 4rem;
		}
	}
</style>
