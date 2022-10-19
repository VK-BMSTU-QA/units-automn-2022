jest.mock('../utils/getDate');
import React from 'react';
import { OrderComponent } from './Order';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getDate } from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock);
	});

	afterEach(() => {
		 jest.clearAllMocks();
	});

	it('should return null order', () => {
		const order = null;
		const wrapper = shallow(<OrderComponent order={order!} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('should render unfilled order', () => {
		const order = {
			id: 1,
			items: ['1', '2'],
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('should render empty order', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledWith(1588359900000);

	});

	it('should render filled order', () => {
		const order = {
			id: 124,
			date: 1652481120000,
			shop: 'Lamodник.ru',
			items: [
				'Жакет - BOREAL5',
				'Miss Gabby Костюм',
				'Ostin перчатки мужские',
				'Zara худи роз.',
			]
		};
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledWith(1652481120000);
	});
});
