import { sortByItemCount, sortTypes, sortByDate, getSortFunction } from './sortOrders';

describe('getSortFunction function', () => {
	test.each([
		[sortTypes.COUNT, sortByItemCount],
		[sortTypes.DATE, sortByDate],
		['null', null]
	])('Returns correct function', ((sortType, expected) => {
		expect(getSortFunction(sortType)).toBe(expected);
	}));
});

describe('sortByItemCount function', () => {
	test.each([
		{ order1: { items: ['1', '2', '3', '4', '5', '6'] }, order2: { items: ['1', '2', '3', '4', '5'] }, expected: 1 },
		{ order1: { items: ['1', '2', '3', '4'] }, order2: { items: ['1', '2', '3', '4', '5'] }, expected: -1 },
		{ order1: { items: ['1', '2', '3', '4', '5'] }, order2: { items: ['1', '2', '3', '4', '5'] }, expected: 0 },
		{ order1: { items: [] }, order2: { items: ['1', '2', '3', '4', '5'] }, expected: -1 },
		{ order1: { items: ['1', '2', '3', '4', '5'] }, order2: { items: [] }, expected: 1 },
		{ order1: { items: undefined }, order2: { items: ['1', '2', '3', '4', '5'] }, expected: 0 },
		{ order1: { items: ['1', '2', '3', '4', '5'] }, order2: { items: undefined }, expected: 0 },
		{ order1: { items: ['1', '2', '3', '4', '5'] }, order2: {}, expected: 0 },
		{ order1: undefined, order2: { items: ['1', '2', '3', '4', '5'] }, expected: 0 },
		{ order1: { items: ['1', '2', '3', '4', '5'] }, order2: undefined, expected: 0 },

	])('Testing orders %s', ({ order1, order2, expected }) => {
		expect(sortByItemCount(order1!, order2!)).toBe(expected);
	});
});

describe('sortByItemDate function', () => {
	const dateNow = Date.now();
	test.each([
		{ order1: { date: dateNow }, order2: { date: dateNow + 1 }, expected: 1 },
		{ order1: { date: dateNow + 1 }, order2: { date: dateNow }, expected: -1 },
		{ order1: { date: dateNow }, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: 0 }, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: dateNow }, order2: { date: 0 }, expected: 0 },
		{ order1: undefined, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: dateNow }, order2: undefined, expected: 0 }
	])('Testing orders %s', ({ order1, order2, expected }) => {
		expect(sortByDate(order1!, order2!)).toBe(expected);
	});
});

describe('sortByItemDate function', () => {
	const dateNow = Date.now();
	test.each([
		{ order1: { date: dateNow }, order2: { date: dateNow + 1 }, expected: 1 },
		{ order1: { date: dateNow + 1 }, order2: { date: dateNow }, expected: -1 },
		{ order1: { date: dateNow }, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: 0 }, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: dateNow }, order2: { date: 0 }, expected: 0 },
		{ order1: undefined, order2: { date: dateNow }, expected: 0 },
		{ order1: { date: dateNow }, order2: undefined, expected: 0 }
	])('Testing orders %s', ({ order1, order2, expected }) => {
		expect(sortByDate(order1!, order2!)).toBe(expected);
	});
});
