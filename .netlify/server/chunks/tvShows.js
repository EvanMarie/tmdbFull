import axios from "axios";
import { w as writable } from "./index.js";
import { V as VITE_ACCESS_TOKEN } from "./NoMoreResults.svelte_svelte_type_style_lang.js";
import { b as get_store_value } from "./ssr.js";
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
const getTVShowsByGenre = async (genreId, page = 1) => {
  const requests = [];
  for (let i = 0; i < 3; i++) {
    requests.push({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=en-US&page=${page + i}&with_original_language=en`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    });
  }
  try {
    const responses = await axios.all(requests.map((request) => axios.request(request)));
    return responses.reduce((results, response) => results.concat(response.data.results), []);
  } catch (error) {
    console.error(error);
    return [];
  }
};
async function searchTVShows(searchQuery, page = 1, append = false) {
  try {
    const url = `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&language=en-US&page=${page}`;
    const response = await axios.request({
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    });
    const fetchedShows = response.data.results;
    if (append) {
      tvShows.update((existingShows) => existingShows.concat(fetchedShows));
    } else {
      tvShows.set(fetchedShows);
    }
    totalTVShowPagesStore.set(response.data.total_pages);
    tvShowPageStore.set(page);
  } catch (error) {
    console.error(error);
  }
}
const loadMoreSearchTVShows = (searchQuery) => {
  tvShowPageStore.update((currentPage) => {
    const nextPage = currentPage + 1;
    searchTVShows(searchQuery, nextPage, true);
    return nextPage;
  });
};
export {
  tvShowPageStore as a,
  totalTVShowPagesStore as b,
  getTVShowsByGenre as c,
  getTVShows as g,
  loadMoreSearchTVShows as l,
  tvShows as t
};
