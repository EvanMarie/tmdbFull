import { c as create_ssr_component, f as createEventDispatcher, e as escape, h as add_attribute } from "./ssr.js";
/* empty css                                             */import axios from "axios";
const css$4 = {
  code: ".page-container.svelte-1eb3ltp{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding-top:125px;padding-bottom:80px}",
  map: null
};
const PageContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="page-container svelte-1eb3ltp">${slots.default ? slots.default({}) : ``} </div>`;
});
const VITE_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
const ReturnToTop_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".return-to-top.svelte-b7667f{position:fixed;bottom:120px;right:-20px;font-weight:bold;border-top-left-radius:30%;border-bottom-left-radius:30%;border-top-right-radius:0px;border-bottom-right-radius:0px;border-right:none;cursor:pointer;padding:10px 22px 10px 8px;background-color:var(--cyan);border-top-left-radius:20px;border-bottom-left-radius:20px}.return-to-top.svelte-b7667f:hover{background-color:var(--lightPink);transform:translateX(-20px) translateY(5px) scale(1.06);transition:all 0.3s ease-in-out}.icon.svelte-b7667f{width:30px}@media(min-width: 600px){.icon.svelte-b7667f{width:40px}}",
  map: null
};
const ReturnToTop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `  <button class="button-styles return-to-top svelte-b7667f" data-svelte-h="svelte-1du3j27"><img src="/arrowUp.png" alt="return to top" class="icon svelte-b7667f"></button>`;
});
const LoadMoreButton_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".load-more-button.svelte-3i5eev{width:300px;font-size:1.2rem}",
  map: null
};
const LoadMoreButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onClick = "" } = $$props;
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$result.css.add(css$2);
  return `<button class="button-styles load-more-button svelte-3i5eev" data-svelte-h="svelte-1h5kusd">Get More</button>`;
});
const API_KEY = "31eb33083cb6b5f3c9e5c3b980247eb9";
function formatDate(dateString) {
  if (!dateString)
    return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
function roundPopularity(popularity) {
  if (!popularity)
    return "";
  return Math.round(popularity);
}
const BASE_URL = "https://api.themoviedb.org/3";
async function fetchGenres(datatype) {
  try {
    const url = `${BASE_URL}/genre/${datatype}/list?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get(url);
    return response.data.genres || [];
  } catch (error) {
    console.error("An error occurred while fetching the genres:", error);
    return [];
  }
}
async function findGenreName(genreId, datatype) {
  try {
    const genres = await fetchGenres(datatype);
    const genre = genres.find((g) => g.id === parseInt(genreId, 10));
    return genre ? genre.name : "";
  } catch (error) {
    console.error("An error occurred while finding the genre name:", error);
    return "";
  }
}
function truncateText(text, length = 50) {
  if (text.length <= length)
    return text;
  return text.slice(0, length) + "...";
}
let colors = ["#8E3BB8", "#0000A1", "#117E82", "#6009B8", "#7A027A", "#0852A1"];
let colorIndex = 0;
function getNextColor() {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
}
const Card_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".item-poster.svelte-15a823f{width:200px;object-fit:cover;display:block;border-radius:10px;box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.8)}.card-styles.svelte-15a823f{padding:1rem;width:300px;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:5px;box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.6);background-color:var(--mediumBlue08)}.card-styles.svelte-15a823f:hover{cursor:pointer;transform:scale(1.05) rotate(-3deg);box-shadow:2px 2px 30px 1px rgba(0, 0, 0, 0.8);transition:all 0.4s ease-in-out}.badge.svelte-15a823f{display:flex;align-items:center;justify-content:center;height:50px;width:50px;padding:3px;border-radius:50%;background-color:var(--lightPink);top:15px;right:15px}.radial-progress.svelte-15a823f{width:99%;height:99%;color:black;font-size:0.7rem;font-weight:bold}.radial-progress.svelte-15a823f::after{background-color:transparent}.card-title.svelte-15a823f{padding:4px;border-radius:5px;text-align:center;text-shadow:3px 2px 20px rgba(0, 0, 0, 1);line-height:1.2rem;margin-top:0.25rem}.card-body.svelte-15a823f{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:5px;font-size:0.9rem}.truncated-overview.svelte-15a823f{height:2.4rem}.truncate-lines.svelte-15a823f{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;line-height:1.2rem}.person-details.svelte-15a823f{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:left}",
  map: null
};
const DEFAULT_IMAGE_URL = "/noimage.png";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { item } = $$props;
  let cardColor = getNextColor();
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$1);
  return `  <div class="indicator"><div class="indicator-item badge svelte-15a823f">${item.rating ? `<div class="radial-progress svelte-15a823f" style="${"--value:" + escape(item.rating * 10, true) + "; --size:1rem; --thickness: 0.2rem;"}">${escape(roundPopularity(item.rating) * 10)}%</div>` : ``} ${item.known_for_department === "Acting" ? `<img src="/acting.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.known_for_department === "Directing" ? `<img src="/directing.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.known_for_department === "Writing" ? `<img src="/writing.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.known_for_department === "Production" ? `<img src="/producing.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.known_for_department === "Editing" ? `<img src="/editing.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.known_for_department === "Visual Effects" ? `<img src="/visual.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${item.datatype === "person" ? `<img src="/person.png" alt="person" class="indicator-icon" style="width: 30px;">` : `${!item.rating ? `<img src="/confused.png" alt="person" class="indicator-icon" style="width: 30px;">` : ``}`}`}`}`}`}`}`}</div> <div class="card-styles svelte-15a823f" role="button" tabindex="0" style="${"background-color: " + escape(cardColor, true) + ";"}"><figure><img${add_attribute(
    "src",
    item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}` : DEFAULT_IMAGE_URL,
    0
  )}${add_attribute("alt", item.title || "No Title", 0)} class="item-poster svelte-15a823f"></figure> <div class="card-body svelte-15a823f"><p class="card-title svelte-15a823f" style="${"color: cyan; font-size: " + escape(item.datatype === "person" ? "1.3rem" : "1.1rem", true) + ";"}">${escape(item.title)}</p> <div class="truncated-overview svelte-15a823f">${item.overview ? `<p class="truncate-lines svelte-15a823f">${escape(item.overview)}</p>` : `<div class="person-details svelte-15a823f"><div><span data-svelte-h="svelte-7khf6t">Gender: </span><span style="color: cyan; text-shadow: 1px 1px 2px black;">${escape(item.gender)}</span></div> <div><span data-svelte-h="svelte-1eimjf8">Known for:</span> <span style="color: cyan; text-shadow: 1px 1px 2px black;">${escape(item.known_for_department)}</span></div></div>`}</div></div></div> </div>`;
});
const CardsContainer_svelte_svelte_type_style_lang = "";
const css = {
  code: ".cards-container.svelte-1ugq9qa{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2rem;padding:2rem 5rem 2rem 2rem}@media(min-width: 800px){.cards-container.svelte-1ugq9qa{flex-direction:row;flex-wrap:wrap;column-gap:3rem;align-items:stretch;padding:2rem 4rem}}",
  map: null
};
const CardsContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="cards-container svelte-1ugq9qa">${slots.default ? slots.default({}) : ``} </div>`;
});
const Modal_svelte_svelte_type_style_lang = "";
export {
  CardsContainer as C,
  LoadMoreButton as L,
  PageContainer as P,
  ReturnToTop as R,
  VITE_ACCESS_TOKEN as V,
  Card as a,
  findGenreName as b,
  formatDate as f,
  roundPopularity as r,
  truncateText as t
};
