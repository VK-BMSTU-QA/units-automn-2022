import {getSortFunction, sortByDate, sortByItemCount} from './sortOrders';

describe('getSortFunction function', () => {
	it('should get sortByDate', () => {
		const sortType = 'date';
		const result = getSortFunction(sortType);
		expect(result).toBe(sortByDate);
	});
	it('should get sortByItemCount', () => {
		const sortType = 'count';
		const result = getSortFunction(sortType);
		expect(result).toBe(sortByItemCount);
	});
	it('should get null', () => {
		const sortType = 'undefined';
		const result = getSortFunction(sortType);
		expect(result).toBe(null);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		{order1: null, order2: null, exp: 0},
		{order1: {item: undefined}, order2: {item: ['item1', 'item2']}, exp: 0},
		{order1: {item: ['item1', 'item2']}, order2: {item: undefined}, exp: 0},
	])('empty check orders', ({order1, order2, exp}) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(exp);
	});

	test.each([
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, exp: 0},
		{order1: {items: ['item1', 'item2', 'item3']}, order2: {items: ['1', '2']}, exp: 1},
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2', '3']}, exp: -1},
	])('valid orders check', ({order1, order2, exp}) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(exp);
	});
});

describe('sortByDate function', () => {
	test.each([
		{order1: null, order2: null, exp: 0},
		{order1: {date: undefined}, order2: {date: 1588359900000}, exp: 0},
		{order1: {date: 1588359900000}, order2: {date: undefined}, exp: 0},
	])('empty check orders', ({order1, order2, exp}) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(exp);
	});

	test.each([
		{order1: {date: 1588359900000}, order2: {date: 1588359900000}, exp: 0},
		{order1: {date: 1588359900000}, order2: {date: 1588359900000 + 1588359900000}, exp: 1},
		{order1: {date: 1588359900000 + 1588359900000}, order2: {date: 1588359900000}, exp: -1},
	])('valid orders check', ({order1, order2, exp}) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(exp);
	});
});
