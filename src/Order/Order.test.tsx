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

	it('should render regular order', () => {
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
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render order with empty items', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: []
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call getDate() while rendering regular order', () => {
		const order: Order = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
			]
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(getDate).toBeCalled();
	});

	test.each([
		{ id: undefined, date: 0, shop: undefined, items: [] },
		{ id: 0, date: undefined, shop: 'TestShop', items: [] },
		{ id: 0, date: 0, shop: undefined, items: [] },
		{ id: 0, date: 0, shop: 'TestShop', items: undefined },
	] as Order[])('should not render order when some field is undefined', (order) => {
		const orderComponent = OrderComponent({ order: order });
		expect(orderComponent).toBeNull();
	});
});