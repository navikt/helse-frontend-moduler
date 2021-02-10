import { withinADay } from './calc';
import dayjs from 'dayjs';

describe('calc', () => {
    test('Within a day', () => {
        const day1 = dayjs('2020-02-01');
        const day2 = dayjs('2020-02-02');
        const day3 = dayjs('2020-02-04');
        expect(withinADay(day1.endOf('day'), day2.startOf('day'))).toBeTruthy();
        expect(withinADay(day2.endOf('day'), day3.startOf('day'))).toBeFalsy();
    });
});
