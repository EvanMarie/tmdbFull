

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.7bfab3db.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/LogoHeader.33b08c02.js"];
export const stylesheets = ["_app/immutable/assets/PageContainer.5e766c25.css"];
export const fonts = [];
