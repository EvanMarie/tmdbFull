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
			<img src="hero-logo.png" alt="hero-logo" />
			<a href="/movies"><button class="button-styles">Explore</button></a>
		</div>
	</div>
</div>
