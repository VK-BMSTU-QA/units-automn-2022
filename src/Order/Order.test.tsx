import React from 'react';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
import {fakeOrders} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';
import { getDate } from '../utils/getDate';

jest.mock('../utils/getDate');

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('date');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('render with empty shop', () => {
		const wrapper = shallow(<OrderComponent order={{...fakeOrders[1], shop: ''}}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('render with empty items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render with only id', () => {
		const wrapper = shallow(<OrderComponent order={{id: 123}}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('render with null date', () => {
		const wrapper = shallow(<OrderComponent order={{...fakeOrders[1], date: 0}}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('render with full information about order', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);

		expect(wrapper).toMatchSnapshot();
	});
});

