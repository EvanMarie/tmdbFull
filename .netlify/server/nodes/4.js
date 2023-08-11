

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.f3cd793f.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/LogoHeader.33b08c02.js"];
export const stylesheets = [];
export const fonts = [];
