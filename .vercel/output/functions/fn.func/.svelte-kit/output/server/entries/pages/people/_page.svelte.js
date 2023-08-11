import { c as create_ssr_component, a as subscribe, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { p as pageNumber, t as totalPopularPagesStore, a as people, g as getPeople } from "../../../chunks/popularpeople.js";
import { p as prioritizeImages } from "../../../chunks/prioritizeimages.js";
import { M as Modal } from "../../../chunks/Modal.js";
const LoadPeople = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pageNumber, $$unsubscribe_pageNumber;
  $$unsubscribe_pageNumber = subscribe(pageNumber, (value) => $pageNumber = value);
  let peopleData = [];
  let totalPopularPages;
  let selectedItem = null;
  function closeModal() {
    selectedItem = null;
  }
  totalPopularPagesStore.subscribe((value) => {
    totalPopularPages = value;
  });
  people.subscribe((value) => {
    peopleData = value.map((person) => ({
      // Mapping the properties you need
      id: person.id,
      datatype: "person",
      title: person.name,
      popularity: person.popularity,
      actorDetail: person.actorDetail,
      knownFor: person.known_for.map((item) => ({
        id: item.id,
        title: item.title,
        poster_path: item.backdrop_path,
        rating: item.vote_average,
        release_date: item.release_date
      })),
      gender: person.gender === 1 ? "Female" : "Male",
      known_for_department: person.known_for_department,
      backdrop_path: person.profile_path
    }));
  });
  console.log(people);
  $$unsubscribe_pageNumber();
  return `   <div class="page-header-container" data-svelte-h="svelte-1jpb7uo"><h1>Explore People</h1></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(peopleData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${$pageNumber < totalPopularPages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: getPeople }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadPeople, "LoadPeople").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
