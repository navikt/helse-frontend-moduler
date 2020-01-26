import React from 'react';
import Tabell from '../Tabell';
import Perioderad from './Perioderad';

type Kilde = {
    label: 'SM' | 'IM' | 'SØ';
    link?: string;
}

export enum Dagtype {
    Syk = 'Syk',
    Helg = 'Helg',
    Ferie = 'Ferie',
    Ubestemt = 'Ubestemt',
    Arbeidsdag = 'Arbeidsdag',
    Egenmelding = 'Egenmelding'
}

export interface Dag {
    type: Dagtype;
    dato: string;
    kilde?: Kilde;
    oppgave?: boolean;
    gradering?: number;
}

interface PeriodetabellProps {
    dager: Dag[];
}

const Periodetabell = ({ dager }: PeriodetabellProps) => {
    return (
        <Tabell columns={2} header>
            <p>Sykmeldingsperiode</p><p>Gradering</p>
            {dager.map(dag => <Perioderad key={dag.dato} {...dag} />)}
        </Tabell>
    );
};

export default Periodetabell;
