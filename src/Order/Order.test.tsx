import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import {getDate} from '../utils/getDate';


jest.mock('../utils/getDate');
configure({ adapter: new Adapter() });

describe('OrderComponent function', () => {
	beforeEach(() => {
		getDate.mockReturnValue('test date');
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	test.each([
		[
			shallow(<OrderComponent order={{id: 1}}/>),
			shallow(<OrderComponent order={{}}/>)

		],
	])('it should return null template', (wrapper) => {
		expect(wrapper.getElement()).toBeNull();
	});

	it('it should return empty template', () => {
		const testOrder = {
			id: 1,
			date: 10102020,
			shop: 'shop',
		};
		const wrapper = shallow(<OrderComponent order={testOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('it should return template', () => {
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
