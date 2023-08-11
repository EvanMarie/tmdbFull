import { c as create_ssr_component, f as createEventDispatcher, e as escape, d as each, h as add_attribute, b as get_store_value, v as validate_component } from "../../../../chunks/ssr.js";
import { C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, r as roundPopularity, f as formatDate, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { b as getMoviesByGenre, c as genrePageStore, d as totalGenrePagesStore } from "../../../../chunks/movies.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeimages.js";
const MovieGenreSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedGenre = 10402 } = $$props;
  let genres = [];
  let selectedGenreName = "Select a genre";
  createEventDispatcher();
  if ($$props.selectedGenre === void 0 && $$bindings.selectedGenre && selectedGenre !== void 0)
    $$bindings.selectedGenre(selectedGenre);
  return `  <select><option value="">${escape(selectedGenreName)}</option>${each(genres, (genre) => {
    return `<option${add_attribute("value", genre.id, 0)}>${escape(genre.name)}</option>`;
  })}</select>`;
});
const MovieGenres = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let moreMovies = true;
  let movieData = [];
  let page = 1;
  let genreId = 10402;
  const loadMoviesByGenre = async () => {
    const newMovies = await getMoviesByGenre(genreId, page);
    movieData = [
      ...movieData,
      ...newMovies.map((movie) => ({
        title: movie.title,
        id: movie.id,
        datatype: "movie",
        genre_ids: movie.genre_ids,
        rating: movie.vote_average,
        popularity: roundPopularity(movie.popularity),
        // Use appropriate rating property
        backdrop_path: movie.poster_path,
        overview: movie.overview,
        release_date: formatDate(movie.release_date),
        credits: movie.id
      }))
    ];
    if (newMovies.length < 60) {
      moreMovies = false;
    }
    page += 3;
  };
  function closeModal() {
    selectedItem = null;
  }
  let selectedItem = null;
  moreMovies = get_store_value(genrePageStore) <= get_store_value(totalGenrePagesStore);
  return `  <div class="page-header-container"><p data-svelte-h="svelte-14r827w">Movie Genres</p> <div class="input-and-button">${validate_component(MovieGenreSelector, "MovieGenreSelector").$$render($$result, {}, {}, {})}</div></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(movieData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${moreMovies ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: () => loadMoviesByGenre() }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MovieGenres, "MovieGenres").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
