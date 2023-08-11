// getMovieOrShowDetails.js

import axios from 'axios';
import { VITE_ACCESS_TOKEN as ACCESS_TOKEN } from './tmdb.js';

export const getMovieOrShowDetails = async (id, isShow = false) => {
	// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
	const mediaType = isShow ? 'tv' : 'movie';
	const url = `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`;

	try {
		const response = await axios.request({
			method: 'GET',
			url,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`
			}
		});

		const data = response.data;
		const extractedData = {
			title: isShow ? data.name : data.title,
			release_date: isShow ? data.first_air_date : data.release_date,
			overview: data.overview,
			backdrop_path: data.poster_path,
			rating: data.vote_average,
			genres_ids: data.genres_ids,
			popularity: data.popularity
		};

		return extractedData;
	} catch (error) {
		console.error(error);
		return null;
	}
};
