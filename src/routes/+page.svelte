<!-- +page.svelte -->
<script>
	import LogoHeader from "../components/design/LogoHeader.svelte";


	import PageContainer from "../components/design/PageContainer.svelte";
</script> 
	<LogoHeader/>
<div class="hero min-h-screen" style="background-image: url(/option03.png); overflow-y: hidden;">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-lg">
		<h2 class="mb-5 text-3xl font-bold">Welcome to</h2>
      <h1 class="mb-5 text-5xl font-bold">NJATMDB</h1>
	  <h2 class="mb-5 text-3xl font-bold">not just another TMDB</h2>
      <p class="mb-5">It's kind of like TMDB only better looking.</p>
      <a href="/movies"><button class="button-styles">See what it's like...</button></a>
    </div>
  </div>
</div>




