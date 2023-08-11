import { c as create_ssr_component, h as add_attribute, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { V as VITE_ACCESS_TOKEN, r as roundPopularity, f as formatDate, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import axios from "axios";
import { w as writable } from "../../../../chunks/index.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeimages.js";
import { M as Modal } from "../../../../chunks/Modal.js";
const trendingMovies = writable([]);
let trendingMoviePageNumber = writable(1);
const getTrendingMovies = async (trendingTimeWindow) => {
  let currentPage;
  trendingMoviePageNumber.subscribe((value) => {
    currentPage = value;
  });
  if (currentPage > 5)
    return;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/movie/${trendingTimeWindow}?language=en-US&page=${currentPage}`,
    // use currentPage here
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    if (currentPage === 1) {
      trendingMovies.set(response.data.results);
    } else {
      trendingMovies.update((existingResults) => [...existingResults, ...response.data.results]);
    }
    trendingMoviePageNumber.update((n) => n + 1);
  } catch (error) {
    console.error(error);
  }
};
const LoadTrendingMovies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trendingTimeWindow = "day";
  let movieData = [];
  let selectedItem = null;
  let currentPage = 1;
  trendingMovies.subscribe((value) => {
  });
  trendingMoviePageNumber.subscribe((value) => {
    currentPage = value;
  });
  const handleLoadMore = () => {
    getTrendingMovies(trendingTimeWindow);
  };
  trendingMovies.subscribe((value) => {
    movieData = value.map((movie) => ({
      // Mapping the properties you need
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
    }));
  });
  function closeModal() {
    selectedItem = null;
  }
  {
    {
      {
        trendingMoviePageNumber.set(1);
        getTrendingMovies(trendingTimeWindow);
      }
    }
  }
  return `   <div class="page-header-container"><h1 data-svelte-h="svelte-1kziwe8">Trending Movies</h1> <div style="display: flex; gap: 20px;"><input type="radio" value="day" id="day"${add_attribute("checked", true, 1)}> <label for="day" data-svelte-h="svelte-1aigvqd">Today</label> <input type="radio" value="week" id="week"${""}> <label for="week" data-svelte-h="svelte-njzupu">This Week</label></div></div>  ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(movieData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${currentPage <= 5 ? ` ${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: handleLoadMore }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadTrendingMovies, "LoadTrendingMovies").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
