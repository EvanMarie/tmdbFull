import { c as create_ssr_component, h as add_attribute, v as validate_component, d as each, e as escape } from "../../../../chunks/ssr.js";
import { C as CardsContainer, L as LoadMoreButton, R as ReturnToTop, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { e as movieResults, s as searchMoviePageStore, t as totalMoviePagesStore, f as searchMovies } from "../../../../chunks/movies.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeImages.js";
import { M as Modal } from "../../../../chunks/Modal.js";
const SearchMovies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let movieSearchData = [];
  let searchQuery = "unicorn";
  let currentPage = 1;
  let totalMoviePages = 1;
  let selectedMovie = null;
  const closeMovieModal = () => {
    selectedMovie = null;
  };
  movieResults.subscribe((value) => {
    movieSearchData = value;
  });
  searchMoviePageStore.subscribe((value) => currentPage = value);
  totalMoviePagesStore.subscribe((value) => totalMoviePages = value);
  const loadMoreMovies = () => {
    searchMovies(searchQuery, true);
  };
  movieResults.subscribe((value) => {
    movieSearchData = value.map((movie) => ({
      id: movie.id,
      datatype: "movie",
      genre_ids: movie.genre_ids,
      title: movie.title,
      genre_ids: movie.genre_ids,
      rating: movie.vote_average,
      backdrop_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date
    }));
  });
  return `  <div class="page-header-container"><p data-svelte-h="svelte-6aj3dt">Search Movies</p> <div class="input-and-button"><input type="text" placeholder="Search for a movie..."${add_attribute("value", searchQuery, 0)}> <button class="button-styles" data-svelte-h="svelte-1mltr76">go</button></div></div> ${movieSearchData.length > 0 ? `${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(movieSearchData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })}`;
    }
  })} ${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      selectedItem: selectedMovie,
      close: closeMovieModal
    },
    {},
    {}
  )}` : `<p>No search results to display. Search query: ${escape(searchQuery)}</p> `} ${currentPage <= totalMoviePages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: loadMoreMovies }, {}, {})}` : ``} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SearchMovies, "SearchMovies").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
