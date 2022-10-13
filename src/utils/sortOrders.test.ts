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
	it('same date', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 1,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('different date', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 2,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	});
});

describe('sortOrders function', () => {
	it('empty array', () => {
		const orders: Order[] = [];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([]);
	});

	it('sort two orders', () => {
		const orders: Order[] = [
			{
				date: 2,
			},
			{
				date: 1,
			},
			{
				date: 3,
			}
		];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([
			{
				date: 3,
			},
			{
				date: 2,
			},
			{
				date: 1,
			}
		]);
	});

	it('sort two orders by item count', () => {
		const orders: Order[] = [
			{
				items: ['item1', 'item2'],
			},
			{
				items: ['1'],
			},
			{
				items: ['item1', 'item2', 'item3'],
			}
		];
		sortOrders(orders, sortByItemCount);
		expect(orders).toEqual([
			{
				items: ['1'],
			},
			{
				items: ['item1', 'item2'],
			},
			{
				items: ['item1', 'item2', 'item3'],
			}
		]);
	});

	it('sort empty orders', () => {
		const orders: Order[] = [
			{},
			{},
			{}
		];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([
			{},
			{},
			{}
		]);
	});

	it('sort array of null', () => {
		const orders: Order[] = [
			null,
			null,
			null
		];
		sortOrders(orders, sortByDate);
		expect(orders).toEqual([
			null,
			null,
			null
		]);
	});
});
