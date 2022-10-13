import { sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders } from './sortOrders';
import { Order } from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	test.each([
		[{ items: ['1-1', '1-2'] }, { items: ['2-1', '2-2'] }, 0],
		[{ items: ['1'] }, { items: ['2'] }, 0],
		[{ items: [] }, { items: [] }, 0],
	])('should return 0 when the number of items is same', (order1, order2, expectedRes) => {
		expect(sortByItemCount(order1, order2)).toBe(expectedRes);
	});

	test.each([
		[{ items: [] }, { items: ['1-1'] }],
		[{ items: ['1-1'] }, { items: ['2-1', '2-2'] }],
		[{ items: ['1-1', '1-2'] }, { items: ['2-1', '2-2', '2-3'] }],
	])('should return (-1) when the number of items in the first order is less than in the second order', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(-1);
	});

	test.each([
		[{ items: ['1-1'] }, { items: [] }],
		[{ items: ['1-1', '1-2'] }, { items: ['2-1'] }],
		[{ items: ['1-1', '1-2', '1-3'] }, { items: ['2-1', '2-2'] }],
	])('should return (1) when the number of items in the first order is greater than in the second order', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(1);
	});

	test.each([
		[{}, { items: ['2-1'] }],
		[{ items: ['1-1'] }, {}],
		[undefined!, { items: ['2-1'] }],
		[{ items: ['1-1'] }, undefined!],
	])('should return 0 when some of orders is empty structure or undefined', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('should return (1) when date of the first order less then of the second', () => {
		const order1: Order = { date: 1, };
		const order2: Order = { date: 2, };
		expect(sortByDate(order1, order2)).toBe(1);
	});

	it('should return (-1) when date of the first order greater then of the second', () => {
		const order1: Order = { date: 2, };
		const order2: Order = { date: 1, };
		expect(sortByDate(order1, order2)).toBe(-1);
	});

	it('should return 0 when dates are equal', () => {
		const order1: Order = { date: 1, };
		const order2: Order = { date: 1, };
		expect(sortByDate(order1, order2)).toBe(0);
	});

	test.each([
		[{}, { date: 1 }],
		[{ date: 1 }, {}],
		[undefined!, { date: 1 }],
		[{ date: 1 }, undefined!],
	])('should return 0 when some of orders is empty structure or undefined', (order1, order2) => {
		expect(sortByDate(order1, order2)).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('should return sortByItemCount()', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
	it('should return sortByDate()', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
	it('should return null when requested not sort-by-date or sort-by-count', () => {
		expect(getSortFunction('notCountAndNoteDate')).toBeNull();
	});
});

describe('sortOrders function', () => {
	it('should call sortFunction when orders is not empty', () => {
		const orders: Order[] = [{}, {}];
		const mockSortFunc = jest.fn();
		sortOrders(orders, mockSortFunc);
		expect(mockSortFunc).toBeCalled();
	});

	test.each([
		[[] as Order[]],
		[undefined],
	])('should not call sortFunction when orders is empty or undefiened', (orders) => {
		const mockSortFunc = jest.fn();
		sortOrders(orders, mockSortFunc);
		expect(mockSortFunc).not.toBeCalled();
	});
});