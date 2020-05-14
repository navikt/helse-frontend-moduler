import { ReactNode } from 'react';

export enum PeriodeStatus {
    Suksess = 'suksess',
    Advarsel = 'advarsel',
    Feil = 'feil',
    Ukjent = 'ukjent',
    Inaktiv = 'inaktiv'
}

export interface Periode {
    fom: Date;
    tom: Date;
    status: PeriodeStatus;
    id?: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    disabledLabel?: ReactNode;
}

export interface EnkelTidslinje {
    perioder: Periode[];
}
