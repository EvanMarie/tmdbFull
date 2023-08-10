import axios from 'axios';

export const getCastDetails = async (id, mediaType) => {
	const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

	// Determine the correct endpoint based on the mediaType
	const url =
		mediaType === 'movie'
			? `https://api.themoviedb.org/3/movie/${id}/credits`
			: `https://api.themoviedb.org/3/tv/${id}/credits`;

	try {
		const response = await axios.request({
			method: 'GET',
			url,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		});
		// Map the cast details to only include the properties you need
		return response.data.cast.map((actor) => ({
			name: actor.name,
			profile_path: actor.profile_path,
			id: actor.id
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
};
