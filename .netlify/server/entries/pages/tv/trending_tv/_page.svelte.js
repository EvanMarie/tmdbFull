import { c as create_ssr_component, a as subscribe, h as add_attribute, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { r as roundPopularity, f as formatDate, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import axios from "axios";
import { w as writable } from "../../../../chunks/index.js";
import { V as VITE_ACCESS_TOKEN, M as Modal } from "../../../../chunks/Modal.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeImages.js";
const trendingTVShows = writable([]);
let trendingTVShowPageNumber = writable(1);
let totalTrendingTVShowPages = writable(1);
const getTrendingTVShows = async (trendingTimeWindow) => {
  let currentPage;
  trendingTVShowPageNumber.subscribe((value) => {
    currentPage = value;
  });
  if (currentPage > 5)
    return;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/tv/${trendingTimeWindow}?language=en-US&page=${currentPage}`,
    // use currentPage here
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    totalTrendingTVShowPages.set(response.data.total_pages);
    if (currentPage === 1) {
      trendingTVShows.set(response.data.results);
    } else {
      trendingTVShows.update((existingResults) => [...existingResults, ...response.data.results]);
    }
    trendingTVShowPageNumber.update((n) => n + 1);
  } catch (error) {
    console.error(error);
  }
};
const LoadTrendingTVShows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $trendingTVShowPageNumber, $$unsubscribe_trendingTVShowPageNumber;
  $$unsubscribe_trendingTVShowPageNumber = subscribe(trendingTVShowPageNumber, (value) => $trendingTVShowPageNumber = value);
  let totalTrendingPages = 0;
  let trendingTimeWindow = "day";
  let tvShowData = [];
  let selectedItem = null;
  trendingTVShows.subscribe((value) => {
    tvShowData = value.map((show) => ({
      title: show.name,
      id: show.id,
      datatype: "tv",
      genre_ids: show.genre_ids,
      rating: show.vote_average,
      popularity: roundPopularity(show.popularity),
      backdrop_path: show.poster_path,
      overview: show.overview,
      release_date: formatDate(show.first_air_date),
      credits: show.id
    }));
  });
  totalTrendingTVShowPages.subscribe((value) => {
    totalTrendingPages = value;
  });
  const handleLoadMoreTrending = () => {
    getTrendingTVShows(trendingTimeWindow);
  };
  function closeModal() {
    selectedItem = null;
  }
  $$unsubscribe_trendingTVShowPageNumber();
  return `<div class="page-header-container"><h1 data-svelte-h="svelte-rs3dfh">Trending TV</h1> <div style="display: flex; gap: 20px;"><input type="radio" value="day" id="day"${add_attribute("checked", true, 1)}> <label for="day" data-svelte-h="svelte-1aigvqd">Today</label> <input type="radio" value="week" id="week"${""}> <label for="week" data-svelte-h="svelte-njzupu">This Week</label></div></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(tvShowData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${$trendingTVShowPageNumber < totalTrendingPages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: handleLoadMoreTrending }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadTrendingTVShows, "LoadTrendingTvShows").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
