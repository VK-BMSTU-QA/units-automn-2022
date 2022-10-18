jest.mock('../utils/getDate');
import React from 'react';
import {getDate} from '../utils/getDate';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fakeOrders } from '../data/fakeOrders';
import { OrderComponent } from './Order';
configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('13 октября, чт, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call getDate on render with empty items', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		};

		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	it('should call getDate on render with not empty items', () => {
		const order = fakeOrders[1];

		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	test.each([
		{id: 0, date: 5, shop: undefined, items:[]},
		{id: 0, date: undefined, shop: 'myShop', items:[]},
	])('Проверка невалидного компонента OrderComponent({order: %s})', (order) => {
		const wrapper = shallow(<OrderComponent order = {order} />);
		expect(wrapper.find('.Order')).toHaveLength(0);
	});
});
