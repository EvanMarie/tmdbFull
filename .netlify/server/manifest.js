export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["acting.png","arrowdown.png","arrowdown2.png","arrowup.png","close.png","confused.png","directing.png","editing.png","favicon.ico","favicon.png","hero-logo.png","hero-logo.psd","hero.png","hero.psd","home.png","iheartcomponents.png","logo.png","menu.png","menu_hover.png","movieMd.png","movieSm.png","movieSm_hover.png","noimage.png","noimage.psd","noimage_sm.png","person.png","person_hover.png","producing.png","search.png","search_hover.png","tv.png","tv_hover.png","visual.png","writing.png"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".psd":"image/vnd.adobe.photoshop"},
	_: {
		client: {"start":"_app/immutable/entry/start.52d0575e.js","app":"_app/immutable/entry/app.e2840b7d.js","imports":["_app/immutable/entry/start.52d0575e.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/singletons.d0f49801.js","_app/immutable/chunks/index.09294a58.js","_app/immutable/entry/app.e2840b7d.js","_app/immutable/chunks/scheduler.c4785dc3.js","_app/immutable/chunks/index.42f95a44.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/movies",
				pattern: /^\/movies\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/movies/movie_genres",
				pattern: /^\/movies\/movie_genres\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/movies/search_movies",
				pattern: /^\/movies\/search_movies\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/movies/trending_movies",
				pattern: /^\/movies\/trending_movies\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/people",
				pattern: /^\/people\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/people/search_people",
				pattern: /^\/people\/search_people\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/people/trending_people",
				pattern: /^\/people\/trending_people\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/tv",
				pattern: /^\/tv\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/tv/search_tv",
				pattern: /^\/tv\/search_tv\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/tv/trending_tv",
				pattern: /^\/tv\/trending_tv\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/tv/tv_genres",
				pattern: /^\/tv\/tv_genres\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 18 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
