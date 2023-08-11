import { c as create_ssr_component, b as get_store_value, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { r as roundPopularity, f as formatDate, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { t as tvShows, a as tvShowPageStore, g as getTVShows, b as totalTVShowPagesStore } from "../../../chunks/tvShows.js";
import { p as prioritizeImages } from "../../../chunks/prioritizeImages.js";
import { M as Modal } from "../../../chunks/Modal.js";
const LoadTvShows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loadMoreTVShowsVisible = true;
  let tvShowData = [];
  tvShows.subscribe((value) => {
    tvShowData = value.map((tvShow) => ({
      title: tvShow.name,
      id: tvShow.id,
      datatype: "tv",
      genre_ids: tvShow.genre_ids,
      rating: tvShow.vote_average,
      popularity: roundPopularity(tvShow.popularity),
      backdrop_path: tvShow.poster_path,
      overview: tvShow.overview,
      release_date: formatDate(tvShow.first_air_date),
      credits: tvShow.id
    }));
  });
  let selectedItem = null;
  function closeModal() {
    selectedItem = null;
  }
  let selectedFilter = "top_rated";
  loadMoreTVShowsVisible = get_store_value(tvShowPageStore) <= get_store_value(totalTVShowPagesStore);
  {
    {
      tvShowPageStore.set(1);
      getTVShows(selectedFilter);
    }
  }
  return `  <div class="page-header-container"><div class="input-and-button" data-svelte-h="svelte-i262ee"><h1>Explore TV</h1></div> <div class="select-container"><select><option value="airing_today" data-svelte-h="svelte-lq7wg3">Airing Today</option><option value="on_the_air" data-svelte-h="svelte-1enqlse">On the Air</option><option value="popular" data-svelte-h="svelte-lpobn0">Popular</option><option value="top_rated" data-svelte-h="svelte-hu02eb">Top Rated</option></select></div></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(tvShowData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${loadMoreTVShowsVisible ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render(
    $$result,
    {
      onClick: () => getTVShows(selectedFilter, true)
    },
    {},
    {}
  )}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadTvShows, "LoadTvShows").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
