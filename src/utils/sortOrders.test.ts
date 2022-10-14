import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{name: 'same items count', order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, exp: 0},
		{name: '1 < 2 items count', order1: {items: ['item1', 'item2'],}, order2: {items: ['1', '2', '3']}, exp: -1},
		{name: '1 > 2 items count', order1: {items: ['item1', 'item2', '3']}, order2: {items: ['1', '2']}, exp: 1},
		{name: 'null order', order1: null, order2: {items: ['1', '2']}, exp: 0},
	])('valid orders check', ({name, order1, order2, exp}) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(exp);
	});
});

describe('sortByDate function', () => {
	test.each([
		{name: 'same date', order1: {date: 1588359900000}, order2: {date: 1588359900000}, exp: 0},
		{name: '1 < 2 date', order1: {date: 1588359900000}, order2: {date: 1588359900001}, exp: 1},
		{name: '1 > 2 date', order1: {date: 1588359900001}, order2: {date: 1588359900000}, exp: -1},
		{name: 'null date', order1: {}, order2: {date: 1588359900000}, exp: 0},
		{name: 'null order', order1: null, order2: {date: 1588359900000}, exp: 0},
	])('valid orders check', ({name, order1, order2, exp}) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(exp);
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