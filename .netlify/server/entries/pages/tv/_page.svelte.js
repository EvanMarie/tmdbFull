import { b as get_store_value, c as create_ssr_component, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { r as roundPopularity, f as formatDate, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import axios from "axios";
import { w as writable } from "../../../chunks/index.js";
import { V as VITE_ACCESS_TOKEN, M as Modal } from "../../../chunks/Modal.js";
import { p as prioritizeImages } from "../../../chunks/prioritizeImages.js";
const tvShows = writable([]);
const tvShowPageStore = writable(1);
const totalTVShowPagesStore = writable(1);
const getTVShows = async (filter = "top_rated", loadMore = false) => {
  const pageToFetch = loadMore ? get_store_value(tvShowPageStore) + 1 : 1;
  const url = `https://api.themoviedb.org/3/tv/${filter}?language=en-US&page=${pageToFetch}`;
  try {
    const response = await axios.request({
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    });
    const fetchedShows = response.data.results;
    if (loadMore) {
      tvShows.update((existingShows) => [...existingShows, ...fetchedShows]);
      tvShowPageStore.update((n) => n + 1);
    } else {
      tvShows.set(fetchedShows);
      tvShowPageStore.set(1);
    }
    totalTVShowPagesStore.set(response.data.total_pages);
  } catch (error) {
    console.error(error);
  }
};
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
