import React from 'react';
import Tabell from '../Tabell';
import { Body, Header } from '../Tabell/Tabell';
import Perioderad from './Perioderad';

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
    console.log(dager);
    return (
        <Tabell>
            <Header>
                <p>Sykmeldingsperiode</p>
                <p>Gradering</p>
            </Header>
            <Body>
                {dager.map((dag, i) => (
                    <React.Fragment key={i}>
                        <Perioderad.Sykmeldingsperiode {...dag} />
                        <Perioderad.Gradering {...dag} />
                    </React.Fragment>
                ))}
            </Body>
        </Tabell>
    );
};

export default Periodetabell;
