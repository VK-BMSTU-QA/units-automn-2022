import Adapter from 'enzyme-adapter-react-16';
import { configure, ShallowWrapper, shallow } from 'enzyme';
import React from 'react';

import { OrderComponent } from './Order';
import type { Order } from '../data/fakeOrders';
import { getDate } from '../utils/getDate';

configure({ adapter: new Adapter() });
jest.mock('../utils/getDate');

describe('Order.tsx', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return null when order does not have shop', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order} />);

		expect(wrapper.getElement()).toBeNull();
	});

	it('should return null when order does not have date', () => {
		const order: Order = {
			id: 123,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order} />);

		expect(wrapper.getElement()).toBeNull();
	});

	it('should return null when order does not have items', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express'
		};
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should return null when items is empty', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: []
		};
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should return template and call getDate when order has all keys', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order} />);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledTimes(1);
		expect(getDate).toHaveBeenCalledWith(order.date);
	});
});
