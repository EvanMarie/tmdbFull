<div class = "cards-container">
    <slot/>
</div>


<style>
    .cards-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        padding: 2rem 4rem;
    }

    	@media (min-width: 768px) {
		.cards-container {
			flex-direction: row;
			flex-wrap: wrap;
			column-gap: 3rem;
			align-items: stretch;
		}
	}
</style>
