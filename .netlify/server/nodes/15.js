

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tv/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.8fa3b234.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/Modal.93cf2df3.js","_app/immutable/chunks/index.09294a58.js","_app/immutable/chunks/prioritizeImages.97612009.js"];
export const stylesheets = ["_app/immutable/assets/Modal.7276d7fb.css","_app/immutable/assets/PageContainer.5e766c25.css"];
export const fonts = [];
