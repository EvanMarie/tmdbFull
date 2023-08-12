import axios from "axios";
import { w as writable } from "./index.js";
import { V as VITE_ACCESS_TOKEN } from "./NoMoreResults.svelte_svelte_type_style_lang.js";
const searchResults = writable([]);
let searchPageNumber = 1;
const totalSearchPagesStore = writable(1);
const people = writable([]);
let pageNumber = writable(1);
const totalPopularPagesStore = writable(1);
const getPeople = async (loadMore = false) => {
  let currentPage;
  pageNumber.subscribe((value) => {
    currentPage = value;
  });
  if (!loadMore && currentPage > 1)
    return;
  let response;
  for (let i = 0; i < 3; i++) {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/person/popular?language=en-US&page=" + currentPage,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    };
    try {
      response = await axios.request(options);
      const peopleWithDetails = await Promise.all(
        response.data.results.map(async (person) => {
          const actorDetail = await getActorDetails(person.id);
          return { ...person, actorDetail };
        })
      );
      people.update((existingResults) => [...existingResults, ...peopleWithDetails]);
      totalPopularPagesStore.set(response.data.total_pages);
      pageNumber.update((n) => n + 1);
    } catch (error) {
      console.error(error);
    }
    if (currentPage >= response.data.total_pages)
      break;
  }
};
const searchPeople = async (query, resetPageNumber = false) => {
  if (resetPageNumber) {
    searchPageNumber = 1;
  }
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/person?language=en-US&query=${query}&page=${searchPageNumber}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    const peopleWithDetails = await Promise.all(
      response.data.results.map(async (person) => {
        const actorDetail = await getActorDetails(person.id);
        return { ...person, actorDetail };
      })
    );
    if (searchPageNumber === 1) {
      searchResults.set(peopleWithDetails);
      totalSearchPagesStore.set(response.data.total_pages);
    } else {
      searchResults.update((existingResults) => [...existingResults, ...peopleWithDetails]);
    }
    searchPageNumber++;
  } catch (error) {
    console.error(error);
  }
};
const getActorDetails = async (personId) => {
  const url = `https://api.themoviedb.org/3/person/${personId}`;
  const options = {
    method: "GET",
    url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export {
  people as a,
  totalSearchPagesStore as b,
  searchPeople as c,
  getActorDetails as d,
  getPeople as g,
  pageNumber as p,
  searchResults as s,
  totalPopularPagesStore as t
};
