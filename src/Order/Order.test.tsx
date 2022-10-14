import React from 'react';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
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

	test.each([
		{testOrder: {
			id: 123,
			date: 1544356800000,
			shop: '',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]}},
		{testOrder: {
			id: 123,
			date: 0,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]}},
		{testOrder: {
			id: 123}},
	])('should render with empty shop or null date or with only id', ({testOrder}) => {
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('should render with empty items', () => {
		const testOrder = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);

		expect(wrapper).toMatchSnapshot();
	});


	it('should render with full information about order', () => {
		const testOrder = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);

		expect(wrapper).toMatchSnapshot();
	});
});

