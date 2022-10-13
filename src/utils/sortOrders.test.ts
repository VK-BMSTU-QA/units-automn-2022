import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';

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

	it( 'invalid order',() => {
		const result = sortByItemCount(undefined, undefined);

		expect(result).toBe(0);
	});
	it( 'undefined items',() => {
		const order1 = {
			items: undefined,
		};
		const order2 = {
			items: undefined,
		};
		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('invalid order1', () => {
		const true_order = {date: 123};
		const result = sortByDate(undefined, true_order);

		expect(result).toBe(0);
	});

	it('equal order', () => {
		const true_order = {date: 123};
		const result = sortByDate(true_order, true_order);

		expect(result).toBe(0);
	});
	it( 'undefined date',() => {
		const order1 = {
			date: undefined,
		};
		const order2 = {
			date: undefined,
		};
		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('length 0', () => {
		const func = jest.fn();
		sortOrders(undefined, func);

		expect(func).not.toBeCalled();
	});
});

describe('getSortFunction function', () => {
	it('undefined', () => {
		const result = getSortFunction(undefined);

		expect(result).toBe(null);
	});
});

