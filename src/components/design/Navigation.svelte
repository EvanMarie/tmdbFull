<script>
	import { onMount } from 'svelte';
	import SearchAll from '../SearchAll.svelte';

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

<button on:click={toggleMenu} class="toggle-button"
	><img src="/menu.png" alt="menu" class="icon" /></button
>

<div
	class={`drawer-menu fixed w-full h-screen bg-gray-100 transition-transform duration-400 ease-in-out ${
		isOpen ? 'open' : ''
	}`}
>
	<div class="menu-container">
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
					<div class="divider" />
				</div>
			</li>
			<li>
				<div class="menu-section">
					<h1>People</h1>
					<div class="divider" />
				</div>
			</li>
			<!-- Add more links as needed -->
		</ul>
		<button on:click={closeMenu} class="close-button">
			<img src="/close.png" alt="close menu" class="close-icon" />
		</button>
	</div>
</div>

<style>
	.toggle-button {
		position: fixed;
		bottom: 40px;
		right: -20px;
		text-align: center;
		padding: 5px 10px;
		cursor: pointer;
		z-index: 700;
		background-color: var(--cyan08);
		color: var(--darkestGray);
		font-weight: bold;
		font-size: 1.25rem;
		display: flex;
		justify-content: center;
		padding: 10px 22px 10px 8px;
		background-color: var(--cyan);
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	.toggle-button:hover {
		background-color: var(--lightCyan);
		/* move left 35px and down 10px while scaling to 1.06 */
		transform: translateX(-20px) translateY(5px) scale(1.06);
		transition: all 0.3s ease-in-out;
	}

	.icon {
		width: 30px;
		height: 30px;
	}

	.drawer-menu {
		bottom: 0;
		right: 0;
		width: 100%;
		max-width: 500px;
		transform: translateY(100%);
		background-color: var(--mediumBlue08);
		padding: 40px 0px 0px 0px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 800;
		box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.2);
	}

	.drawer-menu.open {
		transform: translateY(0);
		transition: all 0.4s ease-in-out;
	}

	.menu-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding-top: 60px;
	}

	.menu-bar {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.menu-bar li {
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

	.menu-section {
		width: 100%;
	}

	.menu-section .divider {
		width: 100%;
		height: 1px;
		background-color: var(--white);
		margin: 5px 0;
	}

	.close-button {
		width: 100%;
		height: 60px;
		background-color: var(--cyan);
		color: var(--darkestGray);
		box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 0;
	}

	.close-icon {
		width: 40px;
	}

	@media (min-width: 600px) {
		.menu-container {
			padding-top: 0px;
		}

		.icon {
			width: 40px;
			height: 40px;
		}
	}
</style>
