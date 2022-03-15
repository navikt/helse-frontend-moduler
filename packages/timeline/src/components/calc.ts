import dayjs, { Dayjs } from 'dayjs';
import { InternalPeriodObject, PeriodObject, PositionedPeriod } from './types';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type Direction = 'left' | 'right';

export const withinADay = (a: Dayjs, b: Dayjs): boolean => {
    return Math.abs(a.diff(b, 'day')) < 1;
};

const flatEdgeLeft = {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
};

const flatEdgeRight = {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
};

const getBorderRadiusLeft = (
    it: InternalPeriodObject,
    i: number,
    allPeriods: InternalPeriodObject[],
    direction: Direction
) =>
    i > 0 && withinADay(allPeriods[i - 1].end, it.start)
        ? direction === 'left'
            ? flatEdgeLeft
            : flatEdgeRight
        : undefined;

const getBorderRadiusRight = (
    it: InternalPeriodObject,
    i: number,
    allPeriods: InternalPeriodObject[],
    direction: Direction
) =>
    i < allPeriods.length - 1 && withinADay(it.end, allPeriods[i + 1].start)
        ? direction === 'left'
            ? flatEdgeRight
            : flatEdgeLeft
        : undefined;

export const position = (date: Dayjs, start: Dayjs, end: Dayjs) => {
    const diff = end.diff(start);
    return (date.diff(start) / diff) * 100;
};

export const getPosition = (date: Date, start: Date, end: Date) => {
    return position(dayjs(date), dayjs(start), dayjs(end));
};

const getAdjustedPeriod = (
    it: { start: dayjs.Dayjs; end: dayjs.Dayjs; id: string },
    rowStart: dayjs.Dayjs,
    rowEnd: dayjs.Dayjs,
    allPeriods: { start: dayjs.Dayjs; end: dayjs.Dayjs; id: string }[],
    i: number,
    direction: Direction
) => {
    let left = position(it.start, rowStart, rowEnd);
    let width = position(it.end, rowStart, rowEnd) - left;
    let borderRadiusLeft = getBorderRadiusLeft(it, i, allPeriods, direction);
    let borderRadiusRight = getBorderRadiusRight(it, i, allPeriods, direction);

    if (left + width > 100) {
        width = 100 - left;
        borderRadiusRight = direction === 'left' ? flatEdgeRight : flatEdgeLeft;
    }
    if (left < 0 && left + width > 0) {
        width = left + width;
        left = 0;
        borderRadiusLeft = direction === 'left' ? flatEdgeLeft : flatEdgeRight;
    }
    return { left, width, borderRadiusLeft, borderRadiusRight };
};

export const getPositionedPeriods = (
    start: Date,
    end: Date,
    groupedPeriods: PeriodObject[][],
    direction: Direction = 'left'
): PositionedPeriod[][] => {
    const rowStart = dayjs(start).startOf('day');
    const rowEnd = dayjs(end).endOf('day');
    return groupedPeriods.map((group) => {
        return group
            .map((period) => ({
                ...period,
                start: dayjs(period.start).startOf('day'),
                end: dayjs(period.end).endOf('day'),
            }))
            .sort((a, b) => (a.end.isAfter(b.end) ? 1 : -1))
            .map((it, i, allPeriods) => {
                const { left, width, borderRadiusLeft, borderRadiusRight } = getAdjustedPeriod(
                    it,
                    rowStart,
                    rowEnd,
                    allPeriods,
                    i,
                    direction
                );

                return {
                    ...it,
                    id: it.id,
                    start: it.start,
                    end: it.end,
                    style: {
                        ...borderRadiusLeft,
                        ...borderRadiusRight,
                        [direction]: `${left}%`,
                        width: `${width}%`,
                    },
                };
            });
    });
};
