jest.mock('../utils/getDate');
import React from 'react';
import { OrderComponent } from './Order';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getDate } from '../utils/getDate';
import { fakeOrders } from '../data/fakeOrders';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('13 октября, чт, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('Test null order', () => {
		const order = null;
		const wrapper = shallow(<OrderComponent order={order!} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('Test unfilled order', () => {
		const order = {
			id: 1,
			items: ['1', '2'],
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('Test empty order', () => {
		const order = fakeOrders[0];
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('Test filled order', () => {
		const order = fakeOrders[1];
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});
});
