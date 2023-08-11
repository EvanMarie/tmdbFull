import { c as create_ssr_component, f as createEventDispatcher, e as escape, d as each, h as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { C as CardsContainer, R as ReturnToTop, a as Card, L as LoadMoreButton, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { c as getTVShowsByGenre } from "../../../../chunks/tvShows.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeImages.js";
const TVGenreSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedGenre = 10765 } = $$props;
  let genres = [];
  let selectedGenreName = "Select a genre";
  createEventDispatcher();
  if ($$props.selectedGenre === void 0 && $$bindings.selectedGenre && selectedGenre !== void 0)
    $$bindings.selectedGenre(selectedGenre);
  return `  <select><option value="">${escape(selectedGenreName)}</option>${each(genres, (genre) => {
    return `<option${add_attribute("value", genre.id, 0)}>${escape(genre.name)}</option>`;
  })}</select>`;
});
const TVGenres = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showsByGenreData = [];
  let genreId = 10765;
  let page = 1;
  let showButton = false;
  let moreShows = true;
  const loadShowsByGenre = async () => {
    const newShows = await getTVShowsByGenre(genreId, page);
    showsByGenreData = [
      ...showsByGenreData,
      ...newShows.map((show) => ({
        title: show.name,
        id: show.id,
        datatype: "tv",
        genre_ids: show.genre_ids,
        rating: show.vote_average,
        // Use appropriate rating property
        popularity: show.popularity,
        backdrop_path: show.poster_path,
        overview: show.overview,
        release_date: show.first_air_date,
        credits: show.id
        // or any other identifier
      }))
    ];
    showButton = true;
    if (newShows.length < 60) {
      moreShows = false;
    }
    page += 3;
  };
  loadShowsByGenre();
  return `<div class="page-header-container"><p data-svelte-h="svelte-wf25py">TV Genres</p> <div class="input-and-button">${validate_component(TVGenreSelector, "TVGenreSelector").$$render($$result, { genreId }, {}, {})}</div></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(showsByGenreData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${``}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${showButton && moreShows ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: loadShowsByGenre }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(TVGenres, "TvGenres").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
