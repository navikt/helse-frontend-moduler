import { Dayjs } from 'dayjs';
import { PeriodeStatus } from './types.external';
import { ReactNode } from 'react';

export type Percentage = number;

export interface PosisjonertElement {
    left: number;
}

export interface EnkelPeriode {
    fom: Dayjs;
    tom: Dayjs;
}

export interface Intervall extends EnkelPeriode, PosisjonertElement {
    id: string;
    width: number;
    active?: boolean;
    focusable?: boolean;
}

export interface PosisjonertPeriode extends EnkelPeriode, PosisjonertElement {
    id: string;
    width: number;
    status: PeriodeStatus;
    active?: boolean;
    cropped?: boolean;
    disabled?: boolean;
    outOfBounds?: boolean;
    sammenheng?: 'venstre' | 'høyre' | 'begge';
    className?: string;
    disabledLabel?: ReactNode;
}

export interface Skalaetikett extends PosisjonertElement {
    left: number;
    label: string;
}

export interface InternalEnkelTidslinje {
    id: string;
    perioder: PosisjonertPeriode[];
}
