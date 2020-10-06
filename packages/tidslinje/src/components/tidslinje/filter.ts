import { PosisjonertElement } from '../types.internal';
import { Dayjs } from 'dayjs';

export const erSynlig = (element: PosisjonertElement): boolean =>
    element.horizontalPosition <= 101 && element.horizontalPosition >= -1;

export const innenEtDøgn = (dato1: Dayjs, dato2: Dayjs): boolean => Math.abs(dato1.diff(dato2, 'day')) <= 1;
