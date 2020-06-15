import { ReactNode } from 'react';

export enum Hendelsetype {
    Historikk,
    Meldinger,
    Dokumenter
}

export enum Hendelsestatus {
    Normal = 'normal',
    Advarsel = 'advarsel'
}

export interface Hendelse {
    id: string;
    dato: string;
    navn: string;
    status?: Hendelsestatus;
    type: Hendelsetype;
    beskrivelse?: ReactNode;
}
