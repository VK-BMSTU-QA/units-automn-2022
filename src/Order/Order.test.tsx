import React from 'react';
import {OrderComponent} from './Order';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';
import {shallow, configure} from 'enzyme';
import { fakeOrders } from '../data/fakeOrders';

jest.mock('../utils/getDate');

configure({ adapter: new Adapter() });

describe('Order component', () => {
	let wrapper;

	// Create mock before tests
	beforeEach(() => {
		(getDate as jest.Mock);
	});

	// Clear mocks after tests
	afterEach(() => {
		jest.clearAllMocks();
	});


	it('should not render order with undefined date', () => {
		const order = {
			shop: 'shop',
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('should not render order with undefined shop', () => {
		const order = {
			date: 5,
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});


	it('should not render undefined order', () => {
		const order = {}
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});
	

	it('should render order with empty items and call "getDate" function', () => {
		const order = 	{
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		},
		wrapper = shallow(<OrderComponent order={order}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledWith(1588359900000);
	});

	it('should render order with items', () => {
		const order = 	{
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		}
		wrapper = shallow(<OrderComponent order={order}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledWith(1544356800000);
	});

	it('should render order with undefined items', () => {
		const order = {
			shop: 'shop',
			date: 5,
		};
		wrapper = shallow(<OrderComponent   order={order}/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});
});

