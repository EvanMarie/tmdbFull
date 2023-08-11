import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const MoviesHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="header-container" data-svelte-h="svelte-1g6m5s0"><a href="/"><img src="/logo.png" alt="logo" class="logo"></a> <div class="header-links-container"><div class="header-links"><a href="/movies/trending_movies"><div class="header-link">Trending Movies</div></a> <a href="/movies/movie_genres"><div class="header-link">Movie Genres</div></a> <a href="/movies/search_movies"><div class="header-link">Search Movies</div></a></div></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MoviesHeader, "MoviesHeader").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
