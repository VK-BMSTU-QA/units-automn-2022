import {getDate} from './getDate';

describe('getDate function', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return empty date', () => {
		const date = 0;
		const result = getDate(date);
		expect(result).toBe('');
	});

	it('should return same date', () => {
		const date = new Date(2021, 0, 1).getTime();
		const result = getDate(date);
		expect(result).toBe('1 января, пт, 2021 год');
	});
});
