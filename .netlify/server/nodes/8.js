

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/movies/movie_genres/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.0ceb251e.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/Modal.6c76a5fc.js","_app/immutable/chunks/movies.87fb9d4d.js","_app/immutable/chunks/index.09294a58.js","_app/immutable/chunks/prioritizeimages.97612009.js"];
export const stylesheets = ["_app/immutable/assets/Modal.2162c41b.css","_app/immutable/assets/PageContainer.5e766c25.css"];
export const fonts = [];
