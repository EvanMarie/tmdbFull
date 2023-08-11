import { c as create_ssr_component, h as add_attribute, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { s as searchResults, b as totalSearchPagesStore, c as searchPeople } from "../../../../chunks/popularpeople.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeimages.js";
import { M as Modal } from "../../../../chunks/Modal.js";
const SearchButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<button type="submit" class="button-styles" data-svelte-h="svelte-5txd1v">go</button>`;
});
const SearchPeople = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchQuery = "Chaplin";
  let searchPageNumber = 1;
  let searchResultsData = [];
  let totalSearchPages = 1;
  let peopleData = [];
  let selectedItem = null;
  function closeModal() {
    selectedItem = null;
  }
  searchResults.subscribe((value) => {
    searchResultsData = value;
  });
  totalSearchPagesStore.subscribe((value) => totalSearchPages = value);
  const handleLoadMore = async () => {
    searchPageNumber++;
    await searchPeople(searchQuery);
  };
  searchResults.subscribe((value) => {
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
  return `  <div class="page-header-container"><p data-svelte-h="svelte-osw48v">Search People</p> <form><div class="input-and-button"><input type="text" placeholder="Search for an actor..."${add_attribute("value", searchQuery, 0)}> ${validate_component(SearchButton, "SearchButton").$$render($$result, {}, {}, {})}</div></form></div>  ${searchResultsData.length > 0 ? `${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(peopleData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${searchResultsData.length > 0 && searchPageNumber < totalSearchPages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: handleLoadMore }, {}, {})}` : ``}` : `<p data-svelte-h="svelte-1v04lu8">No search results to display.</p>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SearchPeople, "SearchPeople").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
