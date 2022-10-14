import {ShallowWrapper, shallow, configure} from 'enzyme';
import React from 'react';
import type {Order} from '../data/fakeOrders';

import {OrderComponent} from './Order';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate');

describe('Order.tsx', () => {
	let wrapper: ShallowWrapper;

	afterEach(() => {
		jest.clearAllMocks();
	});

	test.each([
		{
			order: {
				id: 2,
				date: 2,
				items: ['2'],
			},
		},
		{
			order: {
				id: 1,
				shop: 'Shop1',
				items: ['1'],
			},
		},
		{
			order: {
				date: 0,
				shop: 'Shop0',
				items: ['0'],
			},
		},
	])('null ckecks', ({order}) => {
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('OrderComponent does not have "items" field', () => {
		const order = {
			id: 3,
			date: 3,
			shop: 'Shop3',
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('render with all fields', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс'
			],
		};

		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('render with mocked getDate', () => {
		const order = {
			id: 4,
			date: 4,
			shop: 'Shop4',
			items: ['4'],
		};

		wrapper = shallow(<OrderComponent order={order} />);
		expect(getDate).toHaveBeenCalledTimes(1);
	});
});
