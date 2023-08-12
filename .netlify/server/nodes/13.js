

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/people/trending_people/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/13.9e7ab9b7.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js","_app/immutable/chunks/NoMoreResults.svelte_svelte_type_style_lang.833fbb1f.js","_app/immutable/chunks/index.09294a58.js","_app/immutable/chunks/popularpeople.bc7614fb.js","_app/immutable/chunks/prioritizeimages.97612009.js"];
export const stylesheets = ["_app/immutable/assets/NoMoreResults.bf39b29b.css","_app/immutable/assets/PageContainer.5e766c25.css"];
export const fonts = [];
