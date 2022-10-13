jest.mock('../utils/getDate');

import React from 'react';
import {getDate} from '../utils/getDate';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrderComponent } from './Order';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		getDate.mockReturnValue('15 мая, ср, 2100 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('empty order', () => {
		const order = {};

		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	test.each([
		{order: {id: 1, date: 1588359900000}},
		{order: {id: 1, shop: 'shop'}},
	])('Check for empty date or shop', ({order}) => {
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('should work without order\'s items', () => {
		const order = {
			id: 1,
			date: 1588359900000,
			shop: 'shop',
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should be valid work', () => {
		const order = {
			id: 1,
			date: 1588359900000,
			shop: 'shop',
			items: [
				'item1',
				'item2',
				'item3',
			]
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});