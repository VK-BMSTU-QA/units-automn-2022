import React from 'react';
import { getDate } from '../utils/getDate';
import { Order } from '../data/fakeOrders';
jest.mock('../utils/getDate');
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrderComponent } from './Order';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('14 мая, сб, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test.each([
		['completely filled order',{
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		}],
		['order with empty items',{
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: []
		}],
	])('should render %s, and should call getDate() ', (testName,order) => {
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	test.each([
		undefined,
		{ id: 0, date: 0, shop: undefined, items: [] },
		{ id: 0, date: undefined, shop: 'TestShop', items: [] },
	] as Order[])('should not render order when order, order-shop or order-date is undefined', (order) => {
		const orderComponent = OrderComponent({ order: order });
		expect(orderComponent).toBeNull();
	});
});