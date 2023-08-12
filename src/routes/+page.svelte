<!-- +page.svelte -->
<script>
	import LogoHeader from '../components/design/LogoHeader.svelte';

	import PageContainer from '../components/design/PageContainer.svelte';
</script>

<LogoHeader />
<div class="hero min-h-screen" style="background-image: url(/hero.png); overflow-y: hidden;">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-lg">
			<div class="hero-logo-container">
				<img src="hero-logo.png" alt="hero-logo" class="hero-logo"/>
			</div>
			<a href="/movies"><button class="button-styles">Explore</button></a>
		</div>
	</div>
</div>

<style>
	.hero-logo-container {
		padding-left:40px;
	}

	.hero-logo {
		width: 325px;
	}


	@media (min-width: 768px) {
		.hero-logo-container {
			padding-left:0px;
		}

		.hero-logo {
			width: 500px;
		}
	}

	@media (min-width: 1024px) {
		.hero-logo {
			width: 700px;
		}
	}
</style>
