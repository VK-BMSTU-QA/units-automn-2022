import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{order1: {items: ['item1']}, order2: {items: ['1', '2']}, expected: -1},
		{order1: {items: []}, order2: {items: []}, expected: 0},
		{order1: {items: ['item1']}, order2: {items: []}, expected: 1}
	])('orders with some items', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});

	test.each([
		[
			{order1: {items: undefined}, order2: {items: ['1', '2']}, expected: 0},
			{order1: {items: undefined}, order2: {items: undefined}, expected: 0},
			{order1: {items: ['item1']}, order2: {items: undefined}, expected: 0},
			{order1: {}, order2: {}, expected: 0},
		],
	])('it should return expected number', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
	it('should work with undefined orders', () => {
		const order1 = {};
		const order2 = {};
		expect(sortByItemCount(order1, order2)).toBe(0);
	});

});

describe('sortByDate function', () => {
	test.each([
		{order1: {date: 13102022}, order2: {date: 13102022}, expected: 0},
		{order1: {date: 13102022}, order2: {date: 13102021}, expected: -1},
		{order1: {date: 13102021}, order2: {date: 13102022}, expected: 1},
	])('orders with not null dates', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: {date: undefined}, order2: {date: undefined}, expected: 0},
		{order1: {date: 13102022}, order2: {date: undefined}, expected: 0},
		{order1: {date: undefined}, order2: {date: 13102022}, expected: 0},
		{order1: {}, order2: {}, expected: 0},
	])('empty orders or date', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	it('should work with undefined dates', () => {
		const order1 = {
			date: undefined
		};
		const order2 = {
			date: undefined
		};
		expect(sortByDate(order1, order2)).toBe(0);
	});


	describe('sortOrders function', () => {
		const orders = [
			{
				date: 13102021
			},
			{
				date: 13102022
			},
		];
		const sortFunction = jest.fn();
		sortOrders(orders, sortFunction);

		expect(sortFunction).toBeCalled();
	});

	test.each([
		{orders: [], sortFunction: sortByItemCount, expected: undefined},
		{orders: [], sortFunction: sortByDate, expected: undefined},
	])('empty orders', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});

});

describe('getSortFunction function', () => {
	it(' should be empty', () => {
		const sortType = '';
		const result = getSortFunction(sortType);
		expect(result).toBeNull();
	});

	it('it should return sortByItemCount function', () => {
		const sortType = sortTypes.COUNT;
		const result = getSortFunction(sortType);
		expect(result).toBe(sortByItemCount);
	});

	it('it should return sortByDate function', () => {
		const sortType = sortTypes.DATE;
		const result = getSortFunction(sortType);
		expect(result).toBe(sortByDate);
	});
});

