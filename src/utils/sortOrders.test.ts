import {sortByItemCount, sortOrders, sortByDate} from './sortOrders';
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

	it('null input', () => {
		const result = sortByItemCount({
			items: ['item1', 'item2'],
		}, undefined);

		expect(result).toBe(0);
	});

	it('stupid input', () => {
		const result = sortByItemCount({
			items: ['item1', 'item2'],
		}, {
			items: undefined,
		});

		expect(result).toBe(0);
	});
});

describe('sortOrder function', () => {
	it('usually input', () => {
		const orders: Order[] = [
			{
				id: 1,
				shop: 'test1',
			},
			{
				id: 3,
				shop: 'test1',
			},
			{
				id: 2,
				shop: 'test1',
			},
		];

		sortOrders(orders, (a: Order, b: Order) => (a.id ?? 0) - (b.id ?? 0));

		expect(orders).toStrictEqual([
			{
				id: 1,
				shop: 'test1',
			},
			{
				id: 2,
				shop: 'test1',
			},
			{
				id: 3,
				shop: 'test1',
			},
		]);
	});

	it('broken input', () => {
		const func = jest.fn();

		sortOrders(undefined, func);
		expect(func).not.toBeCalled();
	});
});

describe('sortByDate test', () => {
	it('usually input', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('each test sortByDate', () => {
	const table = [
		{order1: undefined as unknown as Order, order2: { date: 7 }, expected: 0},
		{order1: { date: 4 }, order2: { date: 5 }, expected: 1},
		{order1: { date: 7 }, order2: { date: 3 }, expected: -1},
		{order1: { date: 9 }, order2: undefined as unknown as Order, expected: 0},
		{order1: { date: 1 }, order2: { date: 1 }, expected: 0},
		{order1: {}, order2: { date: 1 }, expected: 0},
	];

	it.each(table)('.sortByDate($order1, $order2)', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});

describe('sortByItemCount function', () => {
	const table = [
		{order1: { items: ['7', '8', '9'] }, order2: { items: ['7', '8', '9'] }, expected: 0},
		{order1: { items: ['10', '11'] }, order2: { items: ['10', '11', '12'] }, expected: -1},
		{order1: { items: ['5', '6'] }, order2: {}, expected: 0},
		{order1: undefined as unknown as Order, order2: { items: ['15'] }, expected: 0},
		{order1: { items: ['16'] }, order2: undefined as unknown as Order, expected: 0},
		{order1: { items: ['13', '14', '15'] }, order2: { items: ['13', '14'] }, expected: 1},
	];

	it.each(table)('.sortByItemCount($order1, $order2)', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});
