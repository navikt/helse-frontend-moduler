import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export type Periodestatus = 'suksess' | 'advarsel' | 'feil' | 'inaktiv' | 'ukjent';
export type Percentage = number;

export interface PosisjonertElement {
    horizontalPosition: number;
    direction: 'left' | 'right';
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
    status: Periodestatus;
    active?: boolean;
    cropped?: boolean;
    disabled?: boolean;
    outOfBounds?: boolean;
    sammenheng?: 'venstre' | 'høyre' | 'begge';
    className?: string;
    disabledLabel?: ReactNode;
}

export interface Skalaetikett extends PosisjonertElement {
    label: string;
}

export interface InternalEnkelTidslinje {
    id: string;
    perioder: PosisjonertPeriode[];
}
