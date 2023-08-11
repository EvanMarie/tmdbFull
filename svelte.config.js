import adapter from '@sveltejs/adapter-netlify';

// const sveltePreprocess = require('svelte-preprocess');
// const netlify = require('@sveltejs/adapter-netlify');
// const pkg = require('./package.json');

// /** @type {import('@sveltejs/kit').Config} */
// module.exports = {
// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: sveltePreprocess(),
// 	kit: {
// 		// By default, `npm run build` will create a standard Node app.
// 		// You can create optimized builds for different platforms by
// 		// specifying a different adapter

// 		adapter: netlify(),

// 		// hydrate the <div id="svelte"> element in src/app.html
// 		target: '#svelte',

// 		vite: {
// 			ssr: {
// 				noExternal: Object.keys(pkg.dependencies || {})
// 			}
// 		}
// 	}
// };

export default {
	kit: {
		// default options are shown
		adapter: adapter({
			// if true, will create a Netlify Edge Function rather
			// than using standard Node-based functions
			edge: false,
			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app.
			// if `edge` is true, this option cannot be used
			split: true
		})
	}
};

// import adapter from '@sveltejs/adapter-cloudflare';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter()
// 		// ... truncated ...
// 	}
// };

// export default config;
