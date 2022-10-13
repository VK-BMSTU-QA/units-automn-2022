jest.mock('../utils/getDate');

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { getDate } from '../utils/getDate';
import { fakeOrders } from '../data/fakeOrders';
import { OrderComponent } from './Order';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
    beforeEach(() => {
        (getDate as jest.Mock).mockReturnValue('17 марта, чт, 2022 год');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('render order without items', () => {
        const order = fakeOrders[0];
        const wrapper = shallow(<OrderComponent order={order} />);

        expect(wrapper).toMatchSnapshot();
        expect(getDate).toBeCalled();
    });

    it('render order with items', () => {
        const order = fakeOrders[1];
        const wrapper = shallow(<OrderComponent order={order} />);

        expect(wrapper).toMatchSnapshot();
        expect(getDate).toBeCalled();
    });

    test.each([
        {
            id: 0,
            date: 5,
            shop: undefined,
            items: []
        },
        {
            id: 0,
            date: undefined,
            shop: 'sem 17.03',
            items: []
        },
    ])('Проверка невалидного компонента OrderComponent({order: %s})', (order) => {
        const wrapper = shallow(<OrderComponent order={order} />);

        expect(wrapper.find('.Order')).toHaveLength(0);
    });
});
