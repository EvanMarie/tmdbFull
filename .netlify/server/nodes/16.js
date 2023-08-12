

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tv/search_tv/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.a61c98c3.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/NoMoreResults.svelte_svelte_type_style_lang.833fbb1f.js","_app/immutable/chunks/tvshows.8cd6e2a7.js","_app/immutable/chunks/index.09294a58.js","_app/immutable/chunks/NoResults.06b536d2.js"];
export const stylesheets = ["_app/immutable/assets/NoMoreResults.bf39b29b.css","_app/immutable/assets/PageContainer.5e766c25.css","_app/immutable/assets/NoResults.5ff0dc6b.css"];
export const fonts = [];
