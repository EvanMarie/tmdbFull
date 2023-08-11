

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tv/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.1b1f938b.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js"];
export const stylesheets = [];
export const fonts = [];
