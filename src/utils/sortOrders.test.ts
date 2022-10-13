import { getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes } from './sortOrders';

describe('sortOrders', () => {
	it('test sorting', () => {
		const orders = [
			{ date: 20 },
			{ date: 5 },
			{ date: 1 }
		];
		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('test orders not array', () => {
		const orders = undefined;
		const sortFunc = jest.fn();
		const res = sortOrders(orders, sortFunc);

		expect(res).toBeUndefined();
	});
});

describe('test sortOrders function', () => {
	it('sortByItemsCount', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
	it('sortByDate', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		[['item1', 'item2'], ['1', '2'], 0],
		[['1', '2', '3'], [], 1],
		[undefined, ['item1', 'item2'], 0],
		[['item1'], ['item1', 'item2'], -1]
	])('.sortByItemCount(%s, %s)', (items1, items2, expectedRes) => {
		const result = sortByItemCount({ items: items1 }, { items: items2 });

		expect(result).toBe(expectedRes);
	});
});


describe('sortByDateCount function', () => {
	test.each([
		[5, 5, 0],
		[1, 5, 1],
		[31, 30, -1],
		[undefined, 2, 0]
	])('.sortByDate(%i, %i)', (firstDate, secondDate, expectedRes) => {
		expect(sortByDate({ date: firstDate }, { date: secondDate })).toBe(expectedRes);
	});
});
