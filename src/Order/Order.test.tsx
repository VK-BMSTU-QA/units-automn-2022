import React from 'react';
import {getDate} from '../utils/getDate';
jest.mock('../utils/getDate');
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('26 мая, пт, 2020 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('empty item list', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: []
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('no shop info', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('all info', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
