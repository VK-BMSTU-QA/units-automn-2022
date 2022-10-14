import {sortByItemCount, sortByDate, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

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

describe('sortByDate function', () => {
	const order1 = {
		date: 1,
	};
	const order2 = {
		date: 2,
	};

	it('same date', () => {
		const result = sortByDate(order1, order1);
		expect(result).toBe(0);
	});

	it('different date', () => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	});
});

describe('sortOrders function', () => {
	const orders: Order[] = [
		{
			items: ['item1', 'item2'],
			date: 2,
		},
		{
			items: ['1'],
			date: 1,
		},
		{
			items: ['item1', 'item2', 'item3'],
			date: 3,
		}
	];

	const ordersSortedDate: Order[] = [
		{
			items: ['item1', 'item2', 'item3'],
			date: 3,
		},
		{
			items: ['item1', 'item2'],
			date: 2,
		},
		{
			items: ['1'],
			date: 1,
		}
	];

	const ordersSortedCount: Order[] = [
		{
			items: ['1'],
			date: 1,
		},
		{
			items: ['item1', 'item2'],
			date: 2,
		},
		{
			items: ['item1', 'item2', 'item3'],
			date: 3,
		}
	];


	it('empty array', () => {
		const orders: Order[] = [];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([]);
	});

	it('sort two orders', () => {
		sortOrders(orders, sortByDate);
		expect(orders).toEqual(ordersSortedDate);
	});

	it('sort two orders by item count', () => {
		sortOrders(orders, sortByItemCount);
		expect(orders).toEqual(ordersSortedCount);
	});

	it('sort empty orders', () => {
		const orders: Order[] = [{},{}];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([{},{}]);
	});

	it('sort array of null', () => {
		const orders: Order[] = [null, null];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([null, null]);
	});
});
