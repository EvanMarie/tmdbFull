import { c as create_ssr_component, a as subscribe, b as get_store_value, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { r as roundPopularity, f as formatDate, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../chunks/NoMoreResults.svelte_svelte_type_style_lang.js";
import { m as movies, g as getMovies, a as moviePageStore, t as totalMoviePagesStore } from "../../../chunks/movies.js";
import { p as prioritizeImages } from "../../../chunks/prioritizeimages.js";
import { w as writable } from "../../../chunks/index.js";
import { M as Modal } from "../../../chunks/Modal.js";
const LoadMovies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $filterStore, $$unsubscribe_filterStore;
  function closeModal() {
    selectedItem = null;
  }
  let loadMoreVisible = true;
  let movieData = [];
  movies.subscribe((value) => {
    movieData = value.map((movie) => ({
      // Mapping the properties you need
      id: movie.id,
      datatype: "movie",
      genre_ids: movie.genre_ids,
      title: movie.title,
      rating: movie.vote_average,
      popularity: roundPopularity(movie.popularity),
      // Use appropriate rating property
      backdrop_path: movie.poster_path,
      overview: movie.overview,
      release_date: formatDate(movie.release_date),
      credits: movie.id
    }));
  });
  let selectedItem = null;
  const filterStore = writable("popular");
  $$unsubscribe_filterStore = subscribe(filterStore, (value) => $filterStore = value);
  console.log(movieData[0]);
  let filter = $filterStore;
  if ($$props.filterStore === void 0 && $$bindings.filterStore && filterStore !== void 0)
    $$bindings.filterStore(filterStore);
  loadMoreVisible = get_store_value(moviePageStore) <= get_store_value(totalMoviePagesStore);
  $$unsubscribe_filterStore();
  return `   <div class="page-header-container"><div class="input-and-button"><h1 data-svelte-h="svelte-980fuo">Explore Movies</h1> <div class="select-container"><select id="filter"><option value="popular" data-svelte-h="svelte-lpobn0">Popular</option><option value="top_rated" data-svelte-h="svelte-hu02eb">Top Rated</option><option value="upcoming" data-svelte-h="svelte-2m822">Upcoming</option><option value="now_playing" data-svelte-h="svelte-s56u81">Now Playing</option></select></div></div></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(movieData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${loadMoreVisible ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: () => getMovies(filter, true) }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadMovies, "LoadMovies").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
