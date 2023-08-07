<script>
import "../app.css";
	import IconMenu from "../components/design/IconMenu.svelte";
	import Navigation from "../components/design/Navigation.svelte";
</script>

<div style="position: relative">
	<Navigation />
	<IconMenu />
	<slot/>
</div>