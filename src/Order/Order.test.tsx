import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import {getDate} from '../utils/getDate';


jest.mock('../utils/getDate');
configure({ adapter: new Adapter() });

describe('OrderComponent function', () => {
	beforeEach(() => {
		getDate.mockReturnValue('test date');
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	test.each([
		[
			shallow(<OrderComponent order={{id: 1}}/>),
			shallow(<OrderComponent order={{}}/>)

		],
	])('order with empty items and empty order', (wrapper) => {
		expect(wrapper.getElement()).toBeNull();
	});

	it('!order.items', () => {
		const testOrder = {
			id: 1,
			date: 10102020,
			shop: 'shop',
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	const testOrder = {
		id: 1,
		date: 10102020,
		shop: 'shop',
		items: [
			'item',
			'item',
			'item',
			'item',
		]
	};
	it('ok', () => {

		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

});
