import React from 'react';
import {OrderComponent} from './Order';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';
import {shallow, configure} from 'enzyme';
jest.mock('../utils/getDate');
import { fakeOrders } from '../data/fakeOrders';

configure({ adapter: new Adapter() });

describe('Order component', () => {
	let wrapper;

	// Create mock before tests
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('2022-10-13');
	});

	// Clear mocks after tests
	afterEach(() => {
		jest.clearAllMocks();
	});


	it('order with undefined date', () => {
		const order = {
			shop: 'shop',
			date: undefined,
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('order with undefined shop', () => {
		const order = {
			shop: undefined,
			date: 5,
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});


	it('undefined order', () => {
		wrapper = shallow(<OrderComponent   order={undefined}/>);

		expect(wrapper.getElement()).toBeNull();
	});
	

	it('order with empty items', () => {
		wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	it('render order with items', () => {
		wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	it('order with undefined items', () => {
		const order = {
			shop: 'shop',
			date: 5,
			items: undefined,
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});
});

