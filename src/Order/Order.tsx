import React from 'react';
import './Order.css';
import {getDate} from '../utils/getDate';
import {Order} from '../data/fakeOrders';

export type OrderComponentProps = {
	order: Order,
}

export const OrderComponent: React.FC<OrderComponentProps> = ({
	order
}) => {
	if (!order || !order.shop || !order.date) {
		return null;
	}

	const getItems = () => {
		const {items} = order;

		if (!items || !items.length) {
			return (
				<div>
					{'Заказ пуст...'}
				</div>
			);
		}

		return items.map((item, index) => (
			<div
				key={index}
				className='Order-item'
			>
				{item}
			</div>
		));
	};

	return (
		<div className='Order'>
			<div className='Order-header'>
				<span className='Order-shop'>{order.shop}</span>
				<span id='date'>{getDate(order.date)}</span>
			</div>

			<div className='Order-items'>
				{getItems()}
			</div>
		</div>
	);
};
