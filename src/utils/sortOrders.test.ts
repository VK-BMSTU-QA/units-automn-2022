import {sortOrders, getSortFunction, sortTypes, sortByItemCount, sortByDate} from './sortOrders';

describe('sortOrders function', ()=>{
	it('compare function call test', () => {
		const orders = [
			{items: ['a', 'b', 'c']},
			{items: ['a', 'b']},
			{items: ['a']}
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('undefined test', () => {
		const orders = undefined;

		const sortFunc = jest.fn();
		const res = sortOrders(orders, sortFunc);
		expect(res).toBeUndefined();
	});
});

describe('getSortFunction function', () => {
	it('sortByItemsCount', () => {
		const sort = getSortFunction(sortTypes.COUNT);
		expect(sort).toBe(sortByItemCount);
	});
	it('sortByDate', () => {
		const sort = getSortFunction(sortTypes.DATE);
		expect(sort).toBe(sortByDate);
	});
});

describe('sortByItemCount function', () => {
	const testCases = [
		{items1: ['a', 'b'], items2: ['a', 'b'], expectedResult: 0},
		{items1: ['a'], items2: ['a', 'b'], expectedResult: -1},
		{items1: ['a', 'b'], items2: ['a'], expectedResult: 1},
		{items1: undefined, items2: ['a', 'b'], expectedResult: 0},
		{items1: ['a', 'b'], items2: undefined, expectedResult: 0},
		{items1: undefined, items2: undefined, expectedResult: 0},
	];
	test.each(testCases)('sortByItemCount(%s, %s)', ({items1, items2, expectedResult}) => {
		const order1 = {
			items: items1
		};
		const order2 = {
			items: items2
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expectedResult);
	});
});

describe('sortByDate function', () => {
	const testCases = [
		{date1: 7, date2: 7, expectedResult: 0},
		{date1: 7, date2: 13, expectedResult: 1},
		{date1: 13, date2: 7, expectedResult: -1},
		{date1: undefined, date2: 1, expectedResult: 0},
		{date1: 1, date2: undefined, expectedResult: 0},
		{date1: undefined, date2: undefined, expectedResult: 0},
	];
	test.each(testCases)('sortByItemCount(%s, %s)', ({date1, date2, expectedResult}) => {
		const order1 = {
			date: date1
		};
		const order2 = {
			date: date2
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(expectedResult);
	});
});

