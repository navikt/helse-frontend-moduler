import React from 'react';
import Tabell from '../Tabell';
import { Body, Header, Rad } from '../Tabell/Tabell';
import Perioderad from './Perioderad';

export type OppgaveStatus = 'ingen' | 'advarsel' | 'løst';

export type Kilde = {
    label: 'SM' | 'IM' | 'SØ';
    link?: string;
};

export enum Dagtype {
    Syk = 'Syk',
    Helg = 'Helg',
    Ferie = 'Ferie',
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
}

export interface PeriodetabellProps {
    dager: Dag[];
}

const backgroundForRow = (status?: OppgaveStatus) => {
    switch (status) {
        case 'advarsel':
            return '#ffe9cc';
        case 'løst':
            return '#cde7d8';
        case 'ingen':
        default:
            return 'transparent';
    }
};

const Periodetabell = ({ dager }: PeriodetabellProps) => {
    return (
        <Tabell>
            <Header>
                <p />
                <p>Sykmeldingsperiode</p>
                <p>Gradering</p>
            </Header>
            <Body>
                {dager.map((dag, i) => (
                    <Rad key={i} disabled={dag.type === Dagtype.Helg} background={backgroundForRow(dag.oppgave)}>
                        <Perioderad.Status status={dag.oppgave} />
                        <Perioderad.Sykmeldingsperiode {...dag} status={dag.oppgave} />
                        <Perioderad.Gradering {...dag} status={dag.oppgave} />
                    </Rad>
                ))}
            </Body>
        </Tabell>
    );
};

export default Periodetabell;
