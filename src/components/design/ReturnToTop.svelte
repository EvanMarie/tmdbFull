<!-- ReturnToTop.svelte -->
<script>
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<button on:click={scrollToTop} class="button-styles return-to-top"
	><img src="/arrowup.png" alt="return to top" class="icon" /></button
>

<style>
	.return-to-top {
		/* Add styling here to position and style the button */
		position: fixed;
		bottom: 120px;
		left: -18px;
		font-weight: bold;
		border-top-right-radius: 30%;
		border-bottom-right-radius: 30%;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		border-left: none;
		cursor: pointer;
		padding: 10px 8px 10px 22px;
		background-color: var(--cyan);

	}

	.return-to-top:hover {
		background-color: var(--lightPink);
		/* move left 35px and down 10px while scaling to 1.06 */
		transform: translateX(20px) translateY(5px) scale(1.06);
		transition: all 0.3s ease-in-out;
	}

	.icon {
		width: 30px;
	}

	@media (min-width: 600px) {
		.icon {
			width: 40px;
		}
	}
</style>
