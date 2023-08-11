

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/movies/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.35b211f3.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js"];
export const stylesheets = [];
export const fonts = [];
