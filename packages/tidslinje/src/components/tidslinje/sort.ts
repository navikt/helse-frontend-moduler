import { EnkelPeriode, PosisjonertPeriode } from '../types.internal';
import { Dayjs } from 'dayjs';

export const sisteDato = (a: Dayjs, b: Dayjs): number => b.diff(a);

export const sistePeriode = (a: PosisjonertPeriode, b: PosisjonertPeriode): number =>
    a.horizontalPosition - b.horizontalPosition;

export const sisteEnklePeriode = (a: EnkelPeriode, b: EnkelPeriode): number => b.tom.diff(a.tom);
