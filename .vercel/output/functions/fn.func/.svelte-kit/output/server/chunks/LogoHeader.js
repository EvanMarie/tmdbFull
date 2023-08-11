import { c as create_ssr_component } from "./ssr.js";
const LogoHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="header-container" data-svelte-h="svelte-5smsdi"><a href="/"><img src="/logo.png" alt="logo" class="logo"></a> <div class="header-links-container"><div class="header-links"><a href="/movies"><div class="header-link logo-header-link">Movies</div></a> <a href="/tv"><div class="header-link logo-header-link">TV</div></a> <a href="/people"><div class="header-link logo-header-link">People</div></a> <a href="/search"><div class="header-link logo-header-link">Search</div></a></div></div></div>`;
});
export {
  LogoHeader as L
};
