<script>
</script>

<div class="icon-menu">
    <a href="/"
		><div class="icon-menu-item">
			<img src="/home.png" alt="home" class="icon" />
		</div></a
	>
	<a href="/movies"
		><div class="icon-menu-item">
			<img src="/movieSm.png" alt="movies" class="icon" />
		</div></a
	>
	<a href="/tv"
		><div class="icon-menu-item">
			<img src="/tv.png" alt="tv" class="icon" />
		</div></a
	>
	<a href="/people"
		><div class="icon-menu-item">
			<img src="/person.png" alt="people" class="icon" />
		</div></a
	>
	<a href="/search"
		><div class="icon-menu-item"><img src="/search.png" alt="search" class="icon" /></div></a
	>
</div>

<style>
	.icon-menu {
		display: flex;
		flex-direction: column;
		height: 200px;
		justify-content: space-around;
		align-items: center;
		gap: 25px;
		position: fixed;
		top: 225px;
		right: -20px;
		z-index: 200;
	}
	.icon-menu-item {
		padding: 10px 22px 10px 8px;
		background-color: var(--cyan);
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		box-shadow: 2px -3px 3px rgba(0, 0, 0, 0.8);
	}

	.icon-menu-item:hover {
		background-color: var(--lightPink);
				box-shadow: 2px -3px 3px rgba(0, 0, 0, 0.9);
		transform: translateX(-20px) translateY(5px) scale(1.06);
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
