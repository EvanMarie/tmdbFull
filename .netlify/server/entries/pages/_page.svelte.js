import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { L as LogoHeader } from "../../chunks/LogoHeader.js";
/* empty css                                                        */const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${validate_component(LogoHeader, "LogoHeader").$$render($$result, {}, {}, {})} <div class="hero min-h-screen" style="background-image: url(/hero.png); overflow-y: hidden;" data-svelte-h="svelte-1puu3vb"><div class="hero-overlay bg-opacity-60"></div> <div class="hero-content text-center text-neutral-content"><div class="max-w-lg"><img src="hero-logo.png" alt="hero-logo"> <a href="/movies"><button class="button-styles">Explore</button></a></div></div></div>`;
});
export {
  Page as default
};
