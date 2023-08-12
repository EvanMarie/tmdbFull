

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.f2584b99.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js"];
export const stylesheets = ["_app/immutable/assets/0.8a7bc0a5.css"];
export const fonts = [];
