import React from 'react';

jest.mock('../utils/getDate');

afterEach(() => {
	jest.resetAllMocks();
});

import {OrderComponent} from './Order';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {getDate} from '../utils/getDate';

describe('Order.tsx', () => {
	const dateExact = new Date(2020, 1, 1).getTime();

	it('empty date', () => {
		const wrapper = shallow(<OrderComponent order={{shop: 'shop', date: 0, items: []}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(0);
	});

	it('exact date', () => {
		const wrapper = shallow(<OrderComponent order={{shop: 'shop', date: dateExact, items: []}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(dateExact);
	});

	it('getItems', () => {
		// test getItems method of OrdeComponent
		const wrapper = shallow(<OrderComponent order={{shop: 'shop', date: dateExact, items: ['item1', 'item2']}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(dateExact);

		const items = wrapper.find('.Order-item');
		expect(items).toHaveLength(2);
		expect(items.at(0).text()).toBe('item1');

		const emptyItems = shallow(<OrderComponent order={{shop: 'shop', date: dateExact, items: []}}/>).find('.Order-item');
		expect(emptyItems).toHaveLength(0);

		const noItems = shallow(<OrderComponent order={{shop: 'shop', date: dateExact}}/>).find('.Order-item');
		expect(noItems).toHaveLength(0);
	});
});
