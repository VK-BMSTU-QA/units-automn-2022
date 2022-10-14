import {sortByItemCount, sortByDate, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it('should compare two same orders by item count and return 0', () => {
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

	it('should compare two same orders by date and return 0', () => {
		const result = sortByDate(order1, order1);
		expect(result).toBe(0);
	});

	it('should compare two different orders by date and return 1', () => {
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


	it('should return same empty array', () => {
		const orders: Order[] = [];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual(orders);
	});

	it('should sort orders by date', () => {
		sortOrders(orders, sortByDate);
		expect(orders).toEqual(ordersSortedDate);
	});

	it('should sort orders by item count', () => {
		sortOrders(orders, sortByItemCount);
		expect(orders).toEqual(ordersSortedCount);
	});

	it('should return same array with empty orders', () => {
		const orders: Order[] = [{},{}];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual(orders);
	});

	it('should return same array of nulls', () => {
		const orders: Order[] = [null, null];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual(orders);
	});
});
