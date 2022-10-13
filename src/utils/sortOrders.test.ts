import {sortOrders} from './sortOrders';
import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';
import {fakeOrders} from '../data/fakeOrders';

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

// My tests

describe('sortByItemCount function', () => {
	it('empty order', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByItemCount(order1!, order2!);

		expect(result).toBe(0);
	});


	it('undefined order', () => {
		const order1 = {
			items: undefined,
		};

		const order2 = {
			items: ['false', 'false'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	test.each([
		[{items: ['item1'],}, {items: ['item1', 'item2'],}, -1],
		[{items: ['item1', 'item2'],}, {items: ['item1', 'item2'],}, 0],
		[{items: ['item1', 'item2'],}, {items: ['item1'],}, 1],])('valid dates', (a, b, expected) => {
		expect(sortByItemCount(a, b)).toBe(expected);
	});
});


describe('sortByDate function', () => {
	it('empty order', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByDate(order1!, order2!);

		expect(result).toBe(0);
	});


	it('zero order', () => {
		const order1 = {
			date: 6,
		};

		const order2 = {
			date: 0,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	test.each([
		[{date: 5,}, {date: 6,}, 1],
		[{date: 100,}, {date: 50,}, -1],
		[{date: 100,}, {date: 100,}, 0],])('valid dates', (a, b, expected) => {
		expect(sortByDate(a, b)).toBe(expected);
	});
});


describe('sortOrders function', () => {
	it('empty orders', () => {

		const orders = undefined;
		const sortFunction = sortByItemCount;
		const result = sortOrders(orders, sortFunction);

		expect(orders).toBe(undefined);
	});

	const fakeOrdersSorted: Order[] = [
		{
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		},
		{
			id: 126,
			date: 1652585550000,
			shop: 'Эльдоградо',
			items: [
				'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)',
				'Игровая приставка Sony PlayStation 4 Pro 1TB Black (CUH-7208B)',
			]
		},
		{
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		},
		{
			id: 124,
			date: 1652481120000,
			shop: 'Lamodник.ru',
			items: [
				'Жакет - BOREAL5',
				'Miss Gabby Костюм',
				'Ostin перчатки мужские',
				'Zara худи роз.',
			]
		},

	];

	test.each([
		[fakeOrders, sortByItemCount, fakeOrdersSorted],])('valid orders', (orders, sortFunction, expected) => {
		const result = sortOrders(orders, sortFunction);
		expect(orders).toStrictEqual(expected);
	});
});

describe('getSortFunction with supported comparators and null values', () => {
	test.each([
		[NaN, null],
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount],
		['nothing else', null],
	])('getSortFunction(%i)', (type, expected) => {

		const res = getSortFunction(type);

		expect(res).toEqual(expected);

	});
});
