import dayjs, { Dayjs } from 'dayjs';
import { InternalPeriodObject, PeriodObject, PositionedPeriod } from './types';

const withinADay = (a: Dayjs, b: Dayjs): boolean => Math.abs(a.diff(b, 'day')) <= 1;

const getBorderRadiusLeft = (it: InternalPeriodObject, i: number, allPeriods: InternalPeriodObject[]) =>
    i > 0 && withinADay(allPeriods[i - 1].end, it.start)
        ? {
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0
          }
        : undefined;

const getBorderRadiusRight = (it: InternalPeriodObject, i: number, allPeriods: InternalPeriodObject[]) =>
    i < allPeriods.length - 1 && withinADay(it.end, allPeriods[i + 1].start)
        ? {
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0
          }
        : undefined;

const position = (date: Dayjs, start: Dayjs, end: Dayjs) => {
    const diff = end.diff(start);
    return (date.diff(start) / diff) * 100;
};

export const getPosition = (date: Date, start: Date, end: Date) => {
    return position(dayjs(date), dayjs(start), dayjs(end));
};

export const getPositionedPeriods = (start: Date, end: Date, periods: PeriodObject[]): PositionedPeriod[] => {
    const rowStart = dayjs(start).startOf('day');
    const rowEnd = dayjs(end).endOf('day');
    return periods
        .map(it => ({
            ...it,
            start: dayjs(it.start).startOf('day'),
            end: dayjs(it.end).endOf('day')
        }))
        .map((it, i, allPeriods) => {
            const left = position(it.start, rowStart, rowEnd);
            const width = position(it.end, rowStart, rowEnd) - left;
            const borderRadiusLeft = getBorderRadiusLeft(it, i, allPeriods);
            const borderRadiusRight = getBorderRadiusRight(it, i, allPeriods);
            return {
                id: it.id,
                start: it.start,
                end: it.end,
                style: {
                    ...borderRadiusLeft,
                    ...borderRadiusRight,
                    left: `${left}%`,
                    width: `${width}%`
                }
            };
        });
};
