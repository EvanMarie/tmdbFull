<script>
	import { onMount } from 'svelte';

	let menuOpen = false;
	const closeMenu = () => {
		menuOpen = false;
	};

	let isOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// function closeMenu() {
	// 	isOpen = false;
	// }

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

	function handleOverlayKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			closeMenu();
		}
	}
</script>

<button on:click={toggleMenu} class="toggle-button"
	><img src="/menu.png" alt="menu" class="icon" /></button
>

<div
	class="drawer-overlay"
	class:active={menuOpen}
	on:click={closeMenu}
	on:keydown={handleOverlayKeydown}
	role="button"
	tabindex="0"
/>

<div
	class={`drawer-menu fixed w-full h-screen bg-gray-100 transition-transform duration-400 ease-in-out ${
		menuOpen ? 'open' : ''
	}`}
>
	<div class="menu-container">
		<ul class="menu-bar">
			<li>
				<div class="menu-section">
					<a href="/movies" class="menu-main" on:click={closeMenu}
						><img src="/movieSm_hover.png" alt="movies" style="height: 2rem;" />
						<h1>Movies</h1></a
					>
					<div class="sub-links">
						<a href="/movies/trending_movies" class="menu-sub" on:click={closeMenu}
							>Trending Movies</a
						>
						<a href="/movies/movie_genres" class="menu-sub" on:click={closeMenu}>Movie Genres</a>
						<a href="/movies/search_movies" class="menu-sub" on:click={closeMenu}>Search Movies</a>
					</div>
					<div class="divider" />
				</div>
			</li>
			<li>
				<div class="menu-section">
					<a href="/tv" class="menu-main" on:click={closeMenu}>
						<img src="/tv_hover.png" alt="movies" style="height: 2rem;" />
						<h1>TV</h1>
					</a>
					<div class="sub-links">
						<a href="/tv/trending_tv" class="menu-sub" on:click={closeMenu}>Trending TV</a>
						<a href="/tv/tv_genres" class="menu-sub" on:click={closeMenu}>TV Genres</a>
						<a href="/tv/search_tv" class="menu-sub" on:click={closeMenu}>Search TV</a>
					</div>
					<div class="divider" />
				</div>
			</li>
			<li>
				<div class="menu-section">
					<a href="/people" class="menu-main" on:click={closeMenu}>
						<img src="/person_hover.png" alt="movies" style="height: 2rem;" />
						<h1>People</h1>
					</a>

					<div class="sub-links">
						<a href="/people/trending_people" class="menu-sub" on:click={closeMenu}
							>Trending People</a
						>
						<a href="/people/search_people" class="menu-sub" on:click={closeMenu}>Search People</a>
					</div>
					<div class="divider" />
				</div>
			</li>
			<li>
				<div class="menu-section">
					<a href="/search" class="menu-main">
						<img src="/search_hover.png" alt="movies" style="height: 2rem;" />
						<h1>Search All</h1>
					</a>
				</div>
			</li>
			<li>
				<a href="http://www.iheartcomponents.com" target="_blank" class="iheartcomponents"
					>Created by <img
						src="/iheartcomponents.png"
						style="width:125px; border-radius: 3px;"
						alt="iheartcomponents.com"
					/></a
				>
			</li>
		</ul>
		<button on:click={closeMenu} class="close-button">
			<img src="/close.png" alt="close menu" class="close-icon" />
		</button>
	</div>
</div>

<style>
	.hidden {
		display: none;
	}

	.toggle-button {
		position: fixed;
		bottom: 40px;
		left: -18px;
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
		padding: 10px 8px 10px 22px;
		background-color: var(--cyan);
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}

	.toggle-button:hover {
		background-color: var(--lightPink);
		/* move left 35px and down 10px while scaling to 1.06 */
		transform: translateX(20px) translateY(5px) scale(1.06);
		transition: all 0.3s ease-in-out;
	}

	.icon {
		width: 30px;
		height: 30px;
	}

	.drawer-menu {
		bottom: 0;
		left: 0;
		width: 100%;
		transform: translateY(100%);
		background-color: var(--darkGray08);
		padding: 20px 0px 0px 0px;

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
		padding-top: 70px;
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
		padding: 0px 20px 10px 20px;
	}

	.menu-section h1 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--white);
	}

	.menu-main {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		gap: 10px;
		padding-left: 20px;
	}

	.menu-section .divider {
		width: 100%;
		height: 1px;
		background-color: var(--white);
		margin: 10px 0;
	}

	.menu-bar a {
		width: 100%;
		color: var(--cyan);
		text-shadow: 2px -3px 3px rgba(0, 0, 0, 0.9);
	}

	.menu-bar a:hover,
	h1:hover {
		background-color: var(--lightPink);
		color: var(--darkestGray);
		border-radius: 5px;
		text-shadow: 2px -3px 3px rgba(255, 255, 255, 0.9);
	}

	.sub-links {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 1.5rem;
		padding: 5px 10px;
		gap: 5px;
		text-align: left;
	}

	.menu-sub {
				padding-left: 60px;
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
		.drawer-menu {
			max-width: 400px;
		}
		.menu-container {
			padding-top: 10px;
		}

		.icon {
			width: 40px;
			height: 40px;
		}
	}

	.drawer-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5); /* You can adjust the opacity here */
		backdrop-filter: blur(5px);
		z-index: 750; /* Updated value to make sure it's less than the menu's z-index */
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
	}

	.drawer-overlay.active {
		opacity: 1;
		visibility: visible;
	}

	.iheartcomponents {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: center;
		justify-content: center;
		padding: 8px;
	}
</style>
