import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import {fakeOrders, Order} from '../data/fakeOrders';
import {OrderComponent} from '../Order/Order';
import {
	getSortFunction,
	sortOrders,
	sortTypes,
} from '../utils/sortOrders';

export const App: React.FC = () => {
	const [sortType, setSortType] = useState(sortTypes.DATE);

	const getOrders = (orders: Order[]) => {
		if (!orders || !orders.length) {
			return null;
		}

		return orders.map((order, index) => (
			<OrderComponent
				key={index}
				order={order}
			/>
		));
	};

	const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		setSortType(event.target.value);
	}, []);

	const sortFunc = getSortFunction(sortType);
	if (sortFunc) {
		sortOrders(fakeOrders, sortFunc);
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<span className='App-header-title'>Сортировать заказы</span>

				<select
					value={sortType}
					onChange={onSelectChange}
				>
					<option value={sortTypes.COUNT}>по количеству товаров</option>
					<option value={sortTypes.DATE}>по дате</option>
				</select>
			</header>

			<div className='App-container'>
				{getOrders(fakeOrders)}
			</div>
		</div>
	);
};
