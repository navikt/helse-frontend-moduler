import { ReactNode } from 'react';

export enum PeriodeStatus {
    Suksess = 'suksess',
    Advarsel = 'advarsel',
    Feil = 'feil',
    Ukjent = 'ukjent',
    Inaktiv = 'inaktiv'
}

export interface EnkelPeriode {
    fom: Date;
    tom: Date;
}

export interface Periode extends EnkelPeriode {
    status: PeriodeStatus;
    id?: string;
    disabled?: boolean;
    className?: string;
    disabledLabel?: ReactNode;
}

export interface EnkelTidslinje {
    perioder: Periode[];
}
