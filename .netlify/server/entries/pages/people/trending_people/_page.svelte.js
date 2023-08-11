import { c as create_ssr_component, a as subscribe, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { V as VITE_ACCESS_TOKEN, C as CardsContainer, R as ReturnToTop, L as LoadMoreButton, a as Card, P as PageContainer } from "../../../../chunks/Modal.svelte_svelte_type_style_lang.js";
import axios from "axios";
import { w as writable } from "../../../../chunks/index.js";
import { d as getActorDetails } from "../../../../chunks/popularPeople.js";
import { p as prioritizeImages } from "../../../../chunks/prioritizeImages.js";
import { M as Modal } from "../../../../chunks/Modal.js";
const trendingPeople = writable([]);
let trendingPageNumber = 1;
const totalTrendingPages = writable(1);
const getTrendingPeople = async (loadMore = false) => {
  if (!loadMore && trendingPageNumber > 1)
    return;
  for (let i = 0; i < 3; i++) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/person/week?language=en-US&page=${trendingPageNumber}`,
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
      trendingPeople.update((existingResults) => [...existingResults, ...peopleWithDetails]);
      totalTrendingPages.set(response.data.total_pages);
      trendingPageNumber++;
      if (trendingPageNumber >= response.data.total_pages)
        break;
    } catch (error) {
      console.error(error);
    }
  }
};
const LoadTrendingPeople = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $totalTrendingPages, $$unsubscribe_totalTrendingPages;
  $$unsubscribe_totalTrendingPages = subscribe(totalTrendingPages, (value) => $totalTrendingPages = value);
  let peopleData = [];
  trendingPeople.subscribe((value) => {
  });
  let selectedItem = null;
  function closeModal() {
    selectedItem = null;
  }
  const handleLoadMoreTrending = async () => {
    await getTrendingPeople(true);
  };
  trendingPeople.subscribe((value) => {
    peopleData = value.map((person) => ({
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
  });
  $$unsubscribe_totalTrendingPages();
  return `  <div class="page-header-container" data-svelte-h="svelte-1ldpgsk"><h1>Trending People</h1></div> ${validate_component(CardsContainer, "CardsContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${each(peopleData.sort(prioritizeImages), (item) => {
        return `${validate_component(Card, "Card").$$render($$result, { item }, {}, {})}`;
      })} ${validate_component(Modal, "Modal").$$render($$result, { selectedItem, close: closeModal }, {}, {})}`;
    }
  })} ${validate_component(ReturnToTop, "ReturnToTop").$$render($$result, {}, {}, {})} ${trendingPageNumber < $totalTrendingPages ? `${validate_component(LoadMoreButton, "LoadMoreButton").$$render($$result, { onClick: handleLoadMoreTrending }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageContainer, "PageContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LoadTrendingPeople, "LoadTrendingPeople").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
