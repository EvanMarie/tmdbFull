import { w as writable } from "./index.js";
import axios from "axios";
import { V as VITE_ACCESS_TOKEN } from "./Modal.svelte_svelte_type_style_lang.js";
import { b as get_store_value } from "./ssr.js";
const movies = writable([]);
const moviePageStore = writable(1);
const movieResults = writable([]);
const searchMoviePageStore = writable(1);
const totalMoviePagesStore = writable(1);
const getMovies = async (filter = "popular", loadMore = false) => {
  const pageToFetch = loadMore ? get_store_value(moviePageStore) + 1 : 1;
  const url = `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${pageToFetch}`;
  try {
    const response = await axios.request({
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    });
    const fetchedMovies = response.data.results;
    if (loadMore) {
      movies.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
    } else {
      movies.set(fetchedMovies);
    }
    moviePageStore.set(response.data.page);
    totalMoviePagesStore.set(response.data.total_pages);
  } catch (error) {
    console.error(error);
  }
};
const genrePageStore = writable(1);
const totalGenrePagesStore = writable(1);
const searchMovies = async (searchQuery, loadMore = false) => {
  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
  const pageToFetch = loadMore ? get_store_value(searchMoviePageStore) + 1 : 1;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchQuery
    )}&language=en-US&page=${pageToFetch}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    let fetchedMovies = response.data.results;
    if (loadMore) {
      movieResults.update((existingMovies) => [...existingMovies, ...fetchedMovies]);
    } else {
      movieResults.set(fetchedMovies);
    }
    searchMoviePageStore.set(response.data.page);
    totalMoviePagesStore.set(response.data.total_pages);
  } catch (error) {
    console.error(error);
  }
};
const getMoviesByGenre = async (genreId, page = 1) => {
  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
  const requests = [];
  for (let i = 0; i < 3; i++) {
    requests.push({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page + i}&with_original_language=en`,
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
export {
  moviePageStore as a,
  getMoviesByGenre as b,
  genrePageStore as c,
  totalGenrePagesStore as d,
  movieResults as e,
  searchMovies as f,
  getMovies as g,
  movies as m,
  searchMoviePageStore as s,
  totalMoviePagesStore as t
};
