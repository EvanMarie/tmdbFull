import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { L as LogoHeader } from "../../../chunks/LogoHeader.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(LogoHeader, "LogoHeader").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
