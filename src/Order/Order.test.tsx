import React from 'react';
import {OrderComponent} from './Order';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});
jest.mock('../utils/getDate');

afterEach(() => {
	jest.resetAllMocks();
});

describe('Order.tsx', () => {
	const dateExact = new Date(2020, 1, 1).getTime();

	it('when date is empty', () => {
		const wrapper = shallow(<OrderComponent order={{shop: 'shop', date: 0, items: []}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(0);
	});

	it('when exact date is set on an order', () => {
		const wrapper = shallow(<OrderComponent order={{shop: 'shop', date: dateExact, items: []}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(dateExact);
	});

	it('when exact items are set on an order', () => {
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
