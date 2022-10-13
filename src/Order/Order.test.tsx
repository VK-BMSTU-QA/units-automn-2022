import React from 'react';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
configure({ adapter: new Adapter() });

describe('OrderComponent functions', () => {

	beforeEach(() => {
		getDate.mockReturnValue('test date');
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should expect empty order', () => {
		const testOrder = {};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	test.each([
		{testOrder: {id: 1, shop: 'test'}},
		{testOrder: {id: 1, date: 13102022}},
	])('order.shop is empty or order.date is empty', ({testOrder}) => {
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('should expect no order.items', () => {
		const testOrder = {
			id: 1,
			date: 13102022,
			shop: 'test',
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('positive test', () => {
		const testOrder = {
			id: 1,
			date: 13102022,
			shop: 'test',
			items: [
				'test',
				'test',
				'test',
				'test',
			]
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

});