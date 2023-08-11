import axios from "axios";
import { w as writable } from "./index.js";
const tvShows = writable([]);
const tvShowPageStore = writable(1);
const totalTVShowPagesStore = writable(1);
const getTVShowsByGenre = async (genreId, page = 1) => {
  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
  const requests = [];
  for (let i = 0; i < 3; i++) {
    requests.push({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=en-US&page=${page + i}&with_original_language=en`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
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
    const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
    const url = `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&language=en-US&page=${page}`;
    const response = await axios.request({
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
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
  getTVShowsByGenre as g,
  loadMoreSearchTVShows as l,
  tvShows as t
};
