export type OppgaveStatus = 'ingen' | 'advarsel' | 'løst';

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
    type?: Dagtype;
    kilde?: Kilde;
    oppgave?: OppgaveStatus;
    gradering?: number;
    utbetaling?: number;
}
