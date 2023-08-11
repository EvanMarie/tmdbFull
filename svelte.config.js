import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// default options are shown
		adapter: vercel()
	},
	preprocess: vitePreprocess()
};

export default config;
