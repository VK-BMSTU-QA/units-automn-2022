import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortTypes} from './sortOrders';

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
	it('2 > 1 items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	it('1 > 2 items count', () => {
		const order1 = {
			items: ['item1', 'item2', '3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
	it('null order', () => {
		const order1 = null;

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
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('1 < 2 date', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900001,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	it('1 > 2 date', () => {
		const order1 = {
			date: 1588359900001,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});
	it('null date', () => {
		const order1 = {
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('null order', () => {
		const order1 = null;

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('COUNT sort type', () => {
		const sortType = sortTypes.COUNT;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByItemCount);
	});
	it('DATE sort type', () => {
		const sortType = sortTypes.DATE;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});
	it('bad sort type', () => {
		const sortType = null;

		const result = getSortFunction(sortType);

		expect(result).toBe(null);
	});
});