import {sortOrders, sortByItemCount, sortByDate, getSortFunction, sortTypes} from './sortOrders';
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
});

describe('sortByItemCount function', () => {
	it('should sort two empty orders', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByItemCount(order1!, order2!);

		expect(result).toBe(0);
	});

	// should sort undefined order
	test.each([
		[{items: undefined,}, {items: ['false', 'false'],}, 0],
		[{items: ['false', 'false'],}, {items: undefined,}, 0],])('valid dates', (a, b, expected) => {
		expect(sortByItemCount(a, b)).toBe(expected);
	});

	// should sort defined order
	test.each([
		[{items: ['item1'],}, {items: ['item1', 'item2'],}, -1],
		[{items: ['item1', 'item2'],}, {items: ['item1', 'item2'],}, 0],
		[{items: ['item1', 'item2'],}, {items: ['item1'],}, 1],])('valid dates', (a, b, expected) => {
		expect(sortByItemCount(a, b)).toBe(expected);
	});
});


describe('sortByDate function', () => {
	it('should sort empty order', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByDate(order1!, order2!);

		expect(result).toBe(0);
	});

	// should sort zero order
	test.each([
		[{date: 6,}, {date: 0,}, 0],
		[{date: 0,}, {date: 6,}, 0],])('valid dates', (a, b, expected) => {
		expect(sortByDate(a, b)).toBe(expected);
	});

	// should sort order with non-zero date
	test.each([
		[{date: 5,}, {date: 6,}, 1],
		[{date: 100,}, {date: 50,}, -1],
		[{date: 100,}, {date: 100,}, 0],])('valid dates', (a, b, expected) => {
		expect(sortByDate(a, b)).toBe(expected);
	});
});


describe('sortOrders function', () => {
	it('should sort empty orders', () => {

		const orders = undefined;
		const sortFunction = jest.fn();
		const result = sortOrders(orders, sortFunction);

		expect(orders).toBe(undefined);
		expect(sortFunction).not.toHaveBeenCalled();
	});
	
	const sortF = jest.fn(); 
	it('should sort valid orders', () => {
		const result = sortOrders(fakeOrders, sortF);
		expect(sortF).toBeCalled();
	});
});

describe('getSortFunction with supported comparators and null values', () => {
	test.each([
		[NaN, null],
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount],
		['nothing else', null],
	])('getSortFunction(%i)', (type, expected) => {

		const res = getSortFunction(type);

		expect(res).toEqual(expected);

	});
});
