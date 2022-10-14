import React from 'react';
import {App} from './App';
import {sortTypes} from '../utils/sortOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App/>);
	});

	it('render with default state DATE', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render sorted by count', () => {
		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.COUNT}
		});

		expect(wrapper).toMatchSnapshot();
	});

	it('should render sorted by date after reselect', () => {
		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.COUNT}
		});

		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.DATE}
		});

		expect(wrapper).toMatchSnapshot();
	});
});
