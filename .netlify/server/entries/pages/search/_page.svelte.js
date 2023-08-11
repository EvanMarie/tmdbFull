import { b as get_store_value, c as create_ssr_component, h as add_attribute, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import axios from "axios";
import { d as getActorDetails } from "../../../chunks/popularpeople.js";
import { r as roundPopularity, f as formatDate, C as CardsContainer, L as LoadMoreButton, R as ReturnToTop, a as Card, P as PageContainer } from "../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import { p as prioritizeImages } from "../../../chunks/prioritizeimages.js";
import { M as Modal } from "../../../chunks/Modal.js";
const multiResults = writable([]);
const searchMultiPageStore = writable(1);
const totalMultiPagesStore = writable(1);
const movieResults = writable([]);
const personResults = writable([]);
const searchMulti = async (query, loadMore = false) => {
  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
  const pageToFetch = loadMore ? get_store_value(searchMultiPageStore) + 1 : 1;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${pageToFetch}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  };
  try {
    const response = await axios.request(options);
    let results = response.data.results;
    const peopleWithDetails = await Promise.all(
      results.map(async (result) => {
        if (result.media_type === "person") {
          const actorDetail = await getActorDetails(result.id);
          return { ...result, actorDetail };
        }
        return result;
      })
    );
    results = loadMore ? [...get_store_value(multiResults), ...peopleWithDetails] : peopleWithDetails;
    multiResults.set(results);
    searchMultiPageStore.set(response.data.page);
    totalMultiPagesStore.set(response.data.total_pages);
    const newMovieResults = results.filter((result) => result.media_type === "movie");
    const newPersonResults = results.filter((result) => result.media_type === "person");
    movieResults.set(newMovieResults);
    personResults.set(newPersonResults);
  } catch (error) {
    console.error(error);
  }
};
const SearchAll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let multiSearchData = [];
  let searchQuery = "Tolkien";
  let currentPage = 1;
  let totalMultiPages = 1;
  let selectedItem = null;
  movieResults.subscribe((value) => {
    const movies = value.map((item) => ({
      id: item.id,
      title: item.title,
      rating: item.vote_average,
      popularity: roundPopularity(item.popularity),
      backdrop_path: item.poster_path,
      overview: item.overview,
      release_date: formatDate(item.release_date),
      datatype: "movie"
    }));
    multiSearchData = [...movies, ...multiSearchData];
  });
  personResults.subscribe((value) => {
    const persons = value.map((person) => ({
      // Mapping the properties you need
      id: person.id,
      datatype: "person",
      title: person.name,
      popularity: person.popularity,
      actorDetail: person.actorDetail,
      knownFor: person.known_for.map((item) => ({
        id: item.id,
        title: item.title,
        poster_path: item.backdrop_path,
        rating: item.vote_average,
        release_date: item.release_date
      })),
      gender: person.gender === 1 ? "Female" : "Male",
      known_for_department: person.known_for_department,
      backdrop_path: person.profile_path
    }));
    multiSearchData = [...persons, ...multiSearchData];
  });
  console.log(multiSearchData);
  searchMultiPageStore.subscribe((value) => currentPage = value);
  totalMultiPagesStore.subscribe((value) => totalMultiPages = value);
  const loadMore = () => {
    searchMulti(searchQuery, true);
  };
  const closeModal = () => {
    selectedItem = null;
  };
  return `  <div class="page-header-container"><p data-svelte-h="svelte-11pbtr1">Search All</p> <div class="input-and-button"><input type="text" placeholder="Search entire datab..."${add_attribute("value", searchQuery, 0)}> <button class="button-styles" data-svelte-h="svelte-1mltr76">go</button></div></div> ${multiSearchData.length > 0 ? `${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(multiSearchData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })}`;
    }
  })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}` : ``} ${currentPage <= totalMultiPages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: loadMore }, {}, {})}` : ``} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SearchAll, "SearchAll").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
