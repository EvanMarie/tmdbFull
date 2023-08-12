import { c as create_ssr_component, h as add_attribute, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../../chunks/NoMoreResults.svelte_svelte_type_style_lang.js";
import { t as tvShows, a as tvShowPageStore, b as totalTVShowPagesStore, l as loadMoreSearchTVShows } from "../../../../chunks/tvshows.js";
import { N as NoResults } from "../../../../chunks/NoResults.js";
const SearchTVShows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tvShowData = [];
  let currentPage = 1;
  let totalTVShowPages = 1;
  let searchQuery = "dragon";
  tvShows.subscribe((value) => {
    tvShowData = value.map((show) => ({
      title: show.name,
      id: show.id,
      datatype: "tv",
      genre_ids: show.genre_ids,
      rating: show.vote_average,
      // Update this as needed
      popularity: show.popularity,
      backdrop_path: show.poster_path,
      overview: show.overview,
      release_date: show.first_air_date
    }));
  });
  tvShowPageStore.subscribe((value) => currentPage = value);
  totalTVShowPagesStore.subscribe((value) => totalTVShowPages = value);
  return `<div class="page-header-container"><p data-svelte-h="svelte-1pwotku">Search TV</p> <div class="input-and-button"><input type="text" placeholder="Search for a TV show..."${add_attribute("value", searchQuery, 0)}> <button class="button-styles" data-svelte-h="svelte-1mltr76">go</button></div></div> ${tvShowData.length > 0 ? `${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(tvShowData, (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${``}`;
    }
  })}` : `${validate_component(NoResults, "NoResults").$$render($$result, {}, {}, {})}`} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${currentPage < totalTVShowPages ? `${tvShowData.length > 0 ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render(
    $$result,
    {
      onClick: () => loadMoreSearchTVShows(searchQuery)
    },
    {},
    {}
  )}` : ``}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SearchTVShows, "SearchTvShows").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
