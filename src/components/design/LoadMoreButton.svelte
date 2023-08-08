<script>
	export let onClick = '';
</script>

<button on:click={onClick} class="button-styles load-more-button">Get More</button>

<style>
	.load-more-button {
		width: 300px;
		font-size: 1.2rem;
	}
</style>
