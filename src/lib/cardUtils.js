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

export function truncateText(text, length = 100) {
	if (text.length <= length) return text;
	return text.slice(0, length) + '...';
}
