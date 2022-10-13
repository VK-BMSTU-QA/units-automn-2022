import {sortByItemCount, sortByDate, sortOrders, getSortFunction, sortTypes} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	test.each([
		{first: {items: ['item1', 'item2']}, second: {date: 1588359900000}, expected: 0},
		{first: {date: 1588359900000}, second: {items: ['1', '2']}, expected: 0},
		{first: {date: 1588359900000}, second: {date: 1588359900000}, expected: 0},
	])('sort orders without items', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	test.each([
		{first: {items: ['1', '2']}, second: {items: ['item1', 'item2', 'item3']}, expected: -1},
		{first: {items: ['1', '2', '3']}, second: {items: ['item1', 'item2']}, expected: 1},
	])('sort orders, where one of orders has less items then other', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	it('sort empty orders', () => {
		const first = {};
		const second = {};

		const result = sortByItemCount(first, second);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same order date', () => {
		const first = {date: 1588359900000};
		const second = {date: 1588359900000};

		const result = sortByDate(first, second);

		expect(result).toBe(0);
	});

	test.each([
		{first: {date: 1588359900000}, second: {date: 1588369900001}, expected: 1},
		{first: {date: 1588369900001}, second: {date: 1588359900000}, expected: -1},
	])('sort orders, where one of orders has has later date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	test.each([
		{first: {date: 1588359900000}, second: {items: ['item1', 'item2']}, expected: 0},
		{first: {items: ['1', '2']}, second: {date: 1588359900000}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {items: ['1', '2']}, expected: 0},
	])('sort orders without date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	it('empty orders', () => {
		const first = {};
		const second = {};

		const result = sortByDate(first, second);

		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	test.each([
		{orders: [], sortFunction: sortByDate, expected: undefined},
		{orders: [], sortFunction: sortByItemCount, expected: undefined},
	])('empty orders', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});

	it('sort orders by date', () => {
		const orders = [{date: 1588359900000}, {date: 1588359900001}];
		const sorted = [{date: 1588359900001}, {date: 1588359900000}];

		sortOrders(orders, sortByDate);

		expect(orders).toEqual(sorted);
	});

	it('sort orders by items', () => {
		const orders = [{items: ['1', '2', '3']}, {items: ['item1', 'item2']}];
		const sorted = [{items: ['item1', 'item2']}, {items: ['1', '2', '3']}];

		sortOrders(orders, sortByItemCount);

		expect(orders).toEqual(sorted);
	});
});

describe('getSortFunction function', () => {
	test.each([
		{order: sortTypes.COUNT, expected: 'sortByItemCount'},
		{order: sortTypes.DATE, expected: 'sortByDate'},
	])('get sort function type', ({order, expected}) => {
		expect(getSortFunction(order)?.name).toBe(expected);
	});
});



