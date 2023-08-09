import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

export function formatDate(dateString) {
	if (!dateString) return '';

	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}

export function roundPopularity(popularity) {
	if (!popularity) return '';

	return Math.round(popularity);
}

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchGenres(datatype) {
	try {
		const url = `${BASE_URL}/genre/${datatype}/list?api_key=${API_KEY}&language=en-US`;
		const response = await axios.get(url);
		return response.data.genres || [];
	} catch (error) {
		console.error('An error occurred while fetching the genres:', error);
		return [];
	}
}

export async function findGenreName(genreId, datatype) {
	try {
		const genres = await fetchGenres(datatype);
		const genre = genres.find((g) => g.id === parseInt(genreId, 10));
		return genre ? genre.name : '';
	} catch (error) {
		console.error('An error occurred while finding the genre name:', error);
		return '';
	}
}

export function truncateText(text, length = 50) {
	if (text.length <= length) return text;
	return text.slice(0, length) + '...';
}

let colors = ['#40163D', '#A63841', '#1D3E42', '#122640', '#200124', '#21063D'];
let colorIndex = 0; // Initialize the color index to 0
export function getNextColor() {
	const color = colors[colorIndex];
	colorIndex = (colorIndex + 1) % colors.length;
	return color;
}
