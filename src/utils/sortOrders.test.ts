import {sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{order1: {items:[]}, order2: {items:[]}, expected: 0},
		{order1: {items:['1', '2', '3']}, order2: {items:['1']}, expected: 1},
		{order1: {items:['1']}, order2: {items:['1', '2', '3']}, expected: -1},
	])('orders with items', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
	
	test.each([
		{order1: {items: undefined}, order2: {items: undefined}, expected: 0},
		{order1: {items: ['1', '2', '3']}, order2: {items: undefined}, expected: 0},
		{order1: {items: undefined}, order2: {items: ['1', '2', '3']}, expected: 0},
	])('orders without items', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: null!, order2: {items: ['1', '2', '3']}, expected: 0},
		{order1: {items: ['1', '2', '3']}, order2: null!, expected: 0},
		{order1: null!, order2: null!, expected: 0},
	])('null orders', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		{order1: {date: 13102022}, order2: {date: 13102022}, expected: 0},
		{order1: {date: 14102022}, order2: {date: 13102022}, expected: -1},
		{order1: {date: 13102022}, order2: {date: 14102022}, expected: 1},
		{order1: {date: undefined}, order2: {date: undefined}, expected: 0},
	])('orders with dates', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: {date: 13102022}, order2: {date: undefined}, expected: 0},
		{order1: {date: undefined}, order2: {date: 13102022}, expected: 0},
		{order1: {date: undefined}, order2: {date: undefined}, expected: 0},
	])('orders without dates', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: null!, order2: {date: 13102022}, expected: 0},
		{order1: {date: 13102022}, order2: null!, expected: 0},
		{order1: null!, order2: null!, expected: 0},
	])('null orders', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});

describe('getSortFunction function', () => {
	test.each([
		{sortType: 'date', expected: sortByDate},
		{sortType: 'count', expected: sortByItemCount}
	])('Get sort funcs', ({sortType, expected}) =>{
		expect(getSortFunction(sortType)).toBe(expected);
	});

	it('null', () => {
		const sortType = '';
		const result = getSortFunction(sortType);
		expect(result).toBeNull();
	});
});

describe('sortOrders function', () => {
	test.each([
		{orders: [], sortFunction: sortByItemCount, expected: undefined},
		{orders: [], sortFunction: sortByDate, expected: undefined},
	])('empty orders', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});

	describe('sortOrders function', () => {
		const orders = [
			{date: 13102020},
			{date: 13102021},
		];
		const sortFunction = jest.fn();
		sortOrders(orders, sortFunction);

		expect(sortFunction).toBeCalled();
	});
});
