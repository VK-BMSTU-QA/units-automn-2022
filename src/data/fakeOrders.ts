export type Order = {
	id?: number,
	date?: number,
	shop?: string,
	items?: string[],
}

export const fakeOrders: Order[] = [
	{
		id: 100,
		date: 1588359900000,
		shop: 'Сбереги Мега Маркер',
		items: [],
	},
	{
		id: 123,
		date: 1544356800000,
		shop: 'Alihandro Express',
		items: [
			'Утиный пластмасса для показ новый год',
			'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
			'Новый стиль один розница яйцо для упаковки форма латекс',
		]
	},
	{
		id: 124,
		date: 1652481120000,
		shop: 'Lamodник.ru',
		items: [
			'Жакет - BOREAL5',
			'Miss Gabby Костюм',
			'Ostin перчатки мужские',
			'Zara худи роз.',
		]
	},
	{
		id: 126,
		date: 1652585550000,
		shop: 'Эльдоградо',
		items: [
			'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)',
			'Игровая приставка Sony PlayStation 4 Pro 1TB Black (CUH-7208B)',
		]
	},
];
