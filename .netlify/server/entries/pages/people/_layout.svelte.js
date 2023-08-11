import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const PeopleHeader_svelte_svelte_type_style_lang = "";
const css = {
  code: ".people-header-links.svelte-1jplva1{justify-content:center;gap:40px}@media(min-width: 600px){.people-header-links.svelte-1jplva1{gap:50px}}@media(min-width: 800px){.people-header-links.svelte-1jplva1{gap:100px}}@media(min-width: 1080px){.people-header-links.svelte-1jplva1{gap:150px\n		/* justify-content: space-evenly; */\n				}}@media(min-width: 1300px){.people-header-links.svelte-1jplva1{gap:200px}}",
  map: null
};
const PeopleHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="header-container" data-svelte-h="svelte-bpv6md"><a href="/"><img src="/logo.png" alt="logo" class="logo"></a> <div class="header-links-container"><div class="header-links people-header-links svelte-1jplva1"><a href="/people/trending_people"><div class="header-link">Trending People</div></a> <a href="/people/search_people"><div class="header-link">Search People</div></a></div></div> </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PeopleHeader, "PeopleHeader").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
