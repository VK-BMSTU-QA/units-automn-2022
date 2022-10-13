import React from 'react';
import {getSortFunction} from '../utils/sortOrders';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {OrderComponent} from './Order';
import {getDate} from '../utils/getDate';

jest.mock('../utils/getDate');

afterEach(() => {
	jest.resetAllMocks();
});

describe('Order.tsx', () => {
	it('empty date', () => {
		const order = {
			date: 0,
			shop: 'shop',
			items: ['1', '2', '3'],
		};
		const result = shallow(<OrderComponent order={order}/>);
		expect(result).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(0);
	});

	it('empty items', () => {
		const testDate = new Date(2022, 10, 13).getTime();
		const order = {
			date: testDate,
			shop: 'shop',
			items: [],
		};
		const result = shallow(<OrderComponent order={order}/>);
		expect(result).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(1);
	});

	it('ok', () => {
		const testDate = new Date(2022, 10, 13).getTime();
		const testItems = ['1', '2', '3'];
		const order = {
			date: testDate,
			shop: 'shop',
			items: testItems,
		};
		const result = shallow(<OrderComponent order={order}/>);
		expect(result).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(testDate);

		const items = result.find('.Order-item');
		expect(items).toHaveLength(3);
		for (let i = 0; i < 3; i++) {
			expect(items.at(i).text()).toBe(testItems[i]);
		}
	});
});
