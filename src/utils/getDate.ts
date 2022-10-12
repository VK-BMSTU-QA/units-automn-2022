interface dateMap {
	[key: number]: string;
}

const weeks: dateMap = {
	0: 'вс',
	1: 'пн',
	2: 'вт',
	3: 'ср',
	4: 'чт',
	5: 'пт',
	6: 'сб',
};

const months: dateMap = {
	0: 'января',
	1: 'февраля',
	2: 'марта',
	3: 'апреля',
	4: 'мая',
	5: 'июня',
	6: 'июля',
	7: 'августа',
	8: 'сентября',
	9: 'октября',
	10: 'ноября',
	11: 'декабря',
};

export function getDate(timestamp: number): string {
	if (!timestamp) {
		return '';
	}

	const date = new Date(timestamp);

	const day = date.getDate();
	const week = date.getDay();
	const month = date.getMonth();
	const year = date.getFullYear();

	return `${day} ${months[month]}, ${weeks[week]}, ${year} год`;
}
