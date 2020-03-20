export enum Dagstatus {
    Advarsel = 'advarsel',
    Suksess = 'suksess',
    Feil = 'feil',
    Inaktiv = 'inaktiv'
}

export type Kilde = {
    label: 'SM' | 'IM' | 'SØ';
    link?: string;
};

export enum Dagtype {
    Syk = 'Syk',
    Helg = 'Helg',
    Ferie = 'Ferie',
    Avvist = 'Avvist',
    Ubestemt = 'Ubestemt',
    Arbeidsdag = 'Arbeidsdag',
    Egenmelding = 'Egenmelding'
}

export interface Dag {
    dato: string;
    type: Dagtype;
    kilde?: Kilde;
    status?: Dagstatus;
    gradering?: number;
    utbetaling?: number | string;
    feilmelding?: string;
}
