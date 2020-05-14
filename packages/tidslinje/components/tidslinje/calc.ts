import { EnkelPeriode, Percentage } from '../types.internal';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const breddeMellomDatoer = (start: Dayjs, slutt: Dayjs, totaltAntallDatoer: number): Percentage => {
    const dagerMellomDatoer = slutt.diff(start, 'minute') / 60 / 24;
    return Math.abs((dagerMellomDatoer / totaltAntallDatoer) * 100);
};

export const erLike = (p1: EnkelPeriode, p2?: EnkelPeriode) => p2 && p1.fom.isSame(p2.fom) && p1.tom.isSame(p2.tom);

export const erDelAv = (p1: EnkelPeriode, p2?: EnkelPeriode) => p2 && p1.fom.isBefore(p2.fom) && p1.tom.isAfter(p2.tom);

export const overlapper = (p1: EnkelPeriode, p2?: EnkelPeriode) =>
    p2 && p1.fom.isSameOrBefore(p2.fom) && p1.tom.isSameOrAfter(p2.tom);
