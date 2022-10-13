import { sortOrders, getSortFunction, sortByItemCount, sortTypes, sortByDate } from './sortOrders';
import type { Order } from '../data/fakeOrders';

describe('sortOrders function', () => {
	it('should not call sortFunction when array is empty', () => {
		const orders: Array<Order> = [];
		const sortFunction = jest.fn();

		sortOrders(orders, sortFunction);
		expect(sortFunction).not.toBeCalled();
	});


	it('should call sortFunction when array is not empty', () => {
		const orders: Array<Order> = [
			{ items: ['1', '2'], },
			{ items: ['1', '2'], },
		];
		const sortFunction = jest.fn();

		sortOrders(orders, sortFunction);
		expect(sortFunction).toBeCalled();
	});
});

describe('getSortFunction function', () => {
	it('should not call function when sortType is not valid', () => {
		expect(getSortFunction('NotValidSortType')).toBe(null);
	});

	it('should call function when sortType is valid', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
});

type testTable = {
	order1: Order;
	order2: Order;
	expected: number;
};

describe('sortByItemCount function', () => {
	const table: Array<testTable> = [
		{ order1: {}, order2: { items: ['1', '2'] }, expected: 0 },
		{ order1: { items: ['1', '2'] }, order2: {}, expected: 0 },
		{ order1: { items: ['1', '2'] }, order2: { items: ['1', '2'] }, expected: 0 },
		{ order1: { items: ['1', '2'] }, order2: { items: ['1', '2', '3'] }, expected: -1 },
		{ order1: { items: ['1', '2', '3'] }, order2: { items: ['1', '2'] }, expected: 1 },
	];

	it.each(table)('should return expected number', ({ order1, order2, expected }) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortByDate function', () => {
	const table: Array<testTable> = [
		{ order1: {}, order2: { date: 1 }, expected: 0 },
		{ order1: { date: 1 }, order2: {}, expected: 0 },
		{ order1: { date: 1 }, order2: { date: 1 }, expected: 0 },
		{ order1: { date: 1 }, order2: { date: 2 }, expected: 1 },
		{ order1: { date: 2 }, order2: { date: 1 }, expected: -1 },
	];

	it.each(table)('should return expected number', ({ order1, order2, expected }) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});
