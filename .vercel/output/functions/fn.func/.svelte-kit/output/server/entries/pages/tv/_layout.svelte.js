import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const TVHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="header-container" data-svelte-h="svelte-18f99rd"><a href="/"><img src="/logo.png" alt="logo" class="logo"></a> <div class="header-links-container"><div class="header-links"><a href="/tv/trending_tv"><div class="header-link">Trending TV</div></a> <a href="/tv/tv_genres"><div class="header-link">TV Genres</div></a> <a href="/tv/search_tv"><div class="header-link">Search TV</div></a></div></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(TVHeader, "TvHeader").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
