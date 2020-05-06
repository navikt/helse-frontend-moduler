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
    disabled?: boolean;
    className?: string;
    etikett?: ReactNode;
}

export interface EnkelTidslinje {
    perioder: Periode[];
}
