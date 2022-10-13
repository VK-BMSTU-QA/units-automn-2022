import {getSortFunction, sortByDate, sortByItemCount} from './sortOrders';

describe('getSortFunction function', () => {
	it('get sortByDate', () => {
		const sortType = 'date';

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});
	it('get sortByItemCount', () => {
		const sortType = 'count';

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByItemCount);
	});
	it('get null', () => {
		const sortType = 'undefined';

		const result = getSortFunction(sortType);

		expect(result).toBe(null);
	});
});


describe('sortByItemCount function', () => {
	it('there is no items', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
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
	it('first item count more than second items count', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
	it('second item count more than first items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('sortByDate function', () => {
	it('there is no date', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('same items date', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('first was early than second', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900000 + 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	it('second was early than first', () => {
		const order1 = {
			date: 1588359900000 + 1588359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});
});
