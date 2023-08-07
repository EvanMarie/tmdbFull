<script>
	import { onMount } from 'svelte';

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	onMount(() => {
		function handleKeydown(event) {
			if (event.key === 'Escape') {
				closeMenu();
			}
		}
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<button on:click={toggleMenu} class="toggle-button">Open/Close</button>

<div
	class={`drawer-menu fixed w-full h-screen bg-gray-100 transition-transform duration-300 ease-in-out ${
		isOpen ? 'open' : ''
	}`}
>
	<ul class="menu-bar">
		<li>
			<div class="menu-section">
				<h1>Movies</h1>
				<div class="divider" />
			</div>
		</li>
		<li>
			<div class="menu-section">
				<h1>TV</h1>
			</div>
		</li>
		<li>
			<div class="menu-section">
				<h1>People</h1>
			</div>
		</li>
		<!-- Add more links as needed -->
	</ul>
</div>

<style>
	.menu-bar {
		width: 100%;
	}

	.menu-section {
		width: 100%;
		max-width: 800px;
		padding: 10px 20px;
	}

	.menu-section h1 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--white);
		text-shadow: 2px -4px 4px rgba(0, 0, 0, 0.9);
	}

	.menu-section .divider {
		width: 100%;
		height: 1px;
		background-color: var(--white);
		margin: 5px 0;
	}

	@media screen and (max-width: 1079px) {
		.toggle-button {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			text-align: center;
			padding: 10px;
			cursor: pointer;
			z-index: 1001;
			background-color: var(--cyan08);
			color: var(--darkestGray);
			font-weight: bold;
			font-size: 1.25rem;
			box-shadow: 2px -5px 11px rgba(0, 0, 0, 0.4);
            text-shadow: 2px -5px 11px rgba(255, 255, 255, 0.8);
		}

		.drawer-menu {
			bottom: 0;
			transform: translateY(100%);
			background-color: var(--mediumBlue08);
			padding: 80px 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		.drawer-menu.open {
			transform: translateY(0);
			transition: all 0.4s ease-in-out;
		}
	}

	@media screen and (min-width: 1080px) {
		.toggle-button {
			position: fixed;
			top: 5px;
			right: 15px;
			text-align: center;
			z-index: 1001;
		}

		.drawer-menu {
			top: 0;
			transform: translateY(-100%);
			height: fit-content;
			background-color: var(--mediumBlue08);
			box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
			padding: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		.drawer-menu.open {
			transform: translateY(0);
			transition: all 0.4s ease-in-out;
		}
	}
</style>
