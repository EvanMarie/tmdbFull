

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0a13b7f6.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/singletons.c06bd494.js","_app/immutable/chunks/index.09294a58.js"];
export const stylesheets = [];
export const fonts = [];
