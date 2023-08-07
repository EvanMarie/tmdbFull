<!-- ReturnToTop.svelte -->
<script>
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>

<button on:click={scrollToTop} class="button-styles return-to-top">↑ Top</button>

<style>
  .return-to-top {
    /* Add styling here to position and style the button */
    position: fixed;
    bottom: 60px;
    right: 0px;
    padding: 8px 5px 8px 3px;
    font-weight: bold;
    border-top-left-radius: 30%;
    border-bottom-left-radius: 30%;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
    cursor: pointer;
  }
</style>
