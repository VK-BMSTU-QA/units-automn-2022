import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {OrderComponent} from "./Order";


jest.mock('../utils/getDate');
import {getDate} from "../utils/getDate";
configure({ adapter: new Adapter() });

describe('OrderComponent function', () => {

	beforeEach(() => {
		getDate.mockReturnValue('test date');
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	it('order is empty', () => {
		const testOrder = {
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('order.shop is empty or order.date is empty', () => {
		const testOrder = {
			id: 1
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
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

	it('ok', () => {
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
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

});
