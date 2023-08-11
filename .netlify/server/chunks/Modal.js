import { c as create_ssr_component, h as add_attribute, e as escape, d as each } from "./ssr.js";
import { b as findGenreName, f as formatDate, t as truncateText, r as roundPopularity } from "./Modal.svelte_svelte_type_style_lang.js";
import axios from "axios";
const VITE_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWViMzMwODNjYjZiNWYzYzllNWMzYjk4MDI0N2ViOSIsInN1YiI6IjYzOTNlMGRmYTBmMWEyMDA4NzM3ZTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t05hQyBl-PzrZPdgqQawnxWb0AIR40aBagYNIywe6ao";
const getCastDetails = async (id, mediaType) => {
  const url = mediaType === "movie" ? `https://api.themoviedb.org/3/movie/${id}/credits` : `https://api.themoviedb.org/3/tv/${id}/credits`;
  try {
    const response = await axios.request({
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
      }
    });
    return response.data.cast.map((actor) => ({
      name: actor.name,
      profile_path: actor.profile_path,
      id: actor.id
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
const css = {
  code: ".modal-image-overview.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;width:100%;flex-direction:column;justify-content:center;align-items:center;gap:1rem}.modal-stack.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;max-width:800px;flex-direction:column;justify-content:center;align-items:center;gap:1rem}.modal-backdrop.svelte-1h7ycxs.svelte-1h7ycxs{background-color:rgba(0, 0, 0, 0.7);backdrop-filter:blur(5px)}.modal-box.svelte-1h7ycxs.svelte-1h7ycxs{width:95%;max-width:800px;max-height:85vh;overflow-y:auto;box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.5)}.movie-poster-modal.svelte-1h7ycxs.svelte-1h7ycxs{width:250px;height:100%;object-fit:cover;display:block;border-radius:10px;box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.8);margin-right:10px;margin-bottom:10px}.modal.svelte-1h7ycxs p.svelte-1h7ycxs{margin:0;padding:0;font-size:0.9rem}.type.svelte-1h7ycxs.svelte-1h7ycxs{color:cyan}.stats.svelte-1h7ycxs.svelte-1h7ycxs{width:100%;text-align:center;display:flex;justify-content:space-evenly;align-items:center;gap:0.5rem;font-size:0.75rem}.known-for-list.svelte-1h7ycxs.svelte-1h7ycxs{width:100%;text-align:left}.known-for-container.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;width:100%;flex-direction:column;justify-content:center;align-items:center;gap:2rem;color:cyan}.known-for-item.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.5rem;cursor:pointer}.known-for-poster.svelte-1h7ycxs.svelte-1h7ycxs{width:200px;height:120px;object-fit:cover;display:block;border-radius:5px;box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.8)}.cast-container.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;flex-direction:column;align-items:center;margin-top:10px;gap:10px}.cast-list.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;flex-wrap:wrap;gap:20px;text-align:center}.cast-item.svelte-1h7ycxs.svelte-1h7ycxs{display:flex;flex-direction:column;align-items:center}.cast-item.svelte-1h7ycxs img.svelte-1h7ycxs{width:60px;height:90px;border-radius:20%}@media(min-width: 768px){.modal.svelte-1h7ycxs p.svelte-1h7ycxs{font-size:1.1rem}.modal-image-overview.svelte-1h7ycxs.svelte-1h7ycxs{display:block}.movie-poster-modal.svelte-1h7ycxs.svelte-1h7ycxs{float:left;margin-right:1rem}.stats.svelte-1h7ycxs.svelte-1h7ycxs{font-size:1rem}.known-for-container.svelte-1h7ycxs.svelte-1h7ycxs{flex-direction:row;align-items:flex-end}}",
  map: null
};
const DEFAULT_IMAGE_URL = "/noimage.png";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedItem = null } = $$props;
  let { close } = $$props;
  let genres = [];
  let castDetails = [];
  console.log(selectedItem);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  $$result.css.add(css);
  {
    {
      if (selectedItem) {
        if (selectedItem.genre_ids) {
          (async () => {
            genres = await Promise.all(selectedItem.genre_ids.map((genreId) => findGenreName(genreId, selectedItem.datatype)));
          })();
        }
      }
    }
  }
  {
    {
      if (selectedItem) {
        const mediaType = selectedItem.datatype;
        getCastDetails(selectedItem.id, mediaType).then((cast) => {
          castDetails = cast.slice(0, 5);
          console.log(castDetails);
        });
      }
    }
  }
  return `  <dialog id="my_modal_4" class="modal svelte-1h7ycxs" ${selectedItem !== null ? "open" : ""}><form method="dialog" class="modal-box w-11/12 svelte-1h7ycxs"><button class="btn btn-md btn-circle btn-ghost absolute right-2 top-2" style="margin-left: 20px; margin-bottom: 20px;" data-svelte-h="svelte-qc81xu">✕</button> <div class="modal-stack svelte-1h7ycxs"><div class="modal-image-overview svelte-1h7ycxs">${selectedItem && selectedItem.backdrop_path ? `<img${add_attribute("src", `https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path}`, 0)} alt="Poster" class="movie-poster-modal svelte-1h7ycxs">` : `<img${add_attribute("src", DEFAULT_IMAGE_URL, 0)} alt="Poster" class="movie-poster-modal svelte-1h7ycxs">`} <h3 class="font-bold text-xl" style="color: cyan;">${escape(selectedItem ? selectedItem.title : "Hello!")}</h3> ${selectedItem ? `${selectedItem.overview ? `<p style="padding: 5px 10px;" class="svelte-1h7ycxs">${escape(selectedItem.overview)}</p>` : ``} ${selectedItem.datatype === "movie" | selectedItem.datatype === "tv" ? `<div class="cast-container svelte-1h7ycxs"><h4 style="width:100%; text-align: left;" data-svelte-h="svelte-ym8lvw">Main Cast:</h4> <div class="cast-list svelte-1h7ycxs">${each(castDetails, (cast) => {
    return `<div class="cast-item svelte-1h7ycxs">${cast.profile_path ? `<img${add_attribute("src", `https://image.tmdb.org/t/p/w500${cast.profile_path}`, 0)}${add_attribute("alt", cast.name, 0)} class="svelte-1h7ycxs">` : `<img${add_attribute("src", DEFAULT_IMAGE_URL, 0)}${add_attribute("alt", cast.name, 0)} class="svelte-1h7ycxs">`} <p style="font-size: 0.75rem; width: 50px;" class="svelte-1h7ycxs">${escape(cast.name)}</p> </div>`;
  })}</div></div>` : ``} ${selectedItem && selectedItem.actorDetail ? `${selectedItem.actorDetail.birthday ? `<p class="svelte-1h7ycxs">Born on <span style="color: cyan;">${escape(formatDate(selectedItem.actorDetail.birthday))}</span> ${selectedItem.actorDetail.place_of_birth ? `in ${escape(selectedItem.actorDetail.place_of_birth)}.` : ``}</p> <div class="divider" style="margin: 5px 0px;"></div>` : ``} ${selectedItem.actorDetail.biography ? `<p style="padding: 5px 10px;" class="svelte-1h7ycxs">${escape(selectedItem.actorDetail.biography)}</p>` : ``}` : ``}` : ``}</div> ${selectedItem ? `${selectedItem.genre_ids ? `<div class="genre-list"><span class="type svelte-1h7ycxs" style="padding-right: 5px" data-svelte-h="svelte-quk404">Genres:</span> ${genres.length > 0 ? `${each(genres, (genre, index) => {
    return `<span class="genre">${escape(genre)} ${index !== genres.length - 1 ? `/` : ``} </span>`;
  })}` : `<span class="genre" data-svelte-h="svelte-qiosk0">No genres listed</span>`}</div>` : `<div class="known-for-list svelte-1h7ycxs">${selectedItem.knownFor ? `<h3 data-svelte-h="svelte-u2xinu">Known For:</h3> <div class="known-for-container svelte-1h7ycxs">${each(selectedItem.knownFor, (knownFor) => {
    return `${knownFor.title ? `<div class="known-for-item svelte-1h7ycxs" tabindex="0" role="button"> <p class="known-for-title svelte-1h7ycxs">${escape(truncateText(knownFor.title, 20))}</p> ${knownFor.poster_path ? `<img${add_attribute("src", `https://image.tmdb.org/t/p/w500${knownFor.poster_path}`, 0)} alt="Poster" class="known-for-poster svelte-1h7ycxs">` : `<img${add_attribute("src", "/noimage_sm.png", 0)} alt="Poster" class="known-for-poster svelte-1h7ycxs">`} </div>` : ``}`;
  })}</div>` : ``}</div>`} ${selectedItem.release_date ? `<div class="stats svelte-1h7ycxs"><div class="stat"><div class="type svelte-1h7ycxs" data-svelte-h="svelte-wmwx1e">Rating</div> <div class="value">${escape(selectedItem ? selectedItem.rating : "")} / 10</div></div> <div class="stat"><div class="type svelte-1h7ycxs" data-svelte-h="svelte-rnd83a">Release</div> <div class="value">${escape(selectedItem ? formatDate(selectedItem.release_date) : "")}</div></div> <div class="stat"><div class="type svelte-1h7ycxs" data-svelte-h="svelte-1mc3nfw">Popularity</div> <div class="value">${escape(selectedItem ? roundPopularity(selectedItem.popularity) : "")}</div></div></div>` : ``}` : ``}</div></form> <div class="modal-backdrop svelte-1h7ycxs"><button data-svelte-h="svelte-1b5dwhd">close</button></div> </dialog>`;
});
export {
  Modal as M,
  VITE_ACCESS_TOKEN as V
};
