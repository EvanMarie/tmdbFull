

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/people/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.41c2f3fe.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js"];
export const stylesheets = ["_app/immutable/assets/3.1ec171c3.css"];
export const fonts = [];
