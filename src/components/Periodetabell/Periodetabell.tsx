import React, { useState } from 'react';
import Tabell from '../Tabell';
import { Body, Header, Rad } from '../Tabell/Tabell';
import Perioderad from './Perioderad';
import Overstyring from './Overstyring';
import styled from '@emotion/styled';
import PeriodeContext from './PeriodeContext';
import { Dag, Dagtype, OppgaveStatus } from './types';

export interface PeriodetabellProps {
    dager: Dag[];
    manuellOverstyring?: boolean;
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

const clamp = (value: number, min = 0, max = 100) => Math.max(Math.min(value, max), min);

const PeriodetabellContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Periodetabell = ({ dager, manuellOverstyring }: PeriodetabellProps) => {
    const [overstyrer, setOverstyrer] = useState(false);
    const [periode, setPeriode] = useState(dager ?? []);

    const oppdaterGradering = (index: number, nyGradering: number) => {
        const gradering = clamp(isNaN(nyGradering) ? 0 : nyGradering);
        setPeriode(periode => periode.map((dag, i) => (i === index ? { ...dag, gradering } : dag)));
    };

    const oppdaterType = (index: number, nyType: Dagtype) =>
        setPeriode(periode => periode.map((dag, i) => (i === index ? { ...dag, type: nyType } : dag)));

    return (
        <PeriodeContext.Provider value={{ periode, oppdaterGradering, oppdaterType, overstyrer }}>
            <PeriodetabellContainer>
                {manuellOverstyring && <Overstyring åpen={overstyrer} onOverstyring={() => setOverstyrer(o => !o)} />}
                <Tabell>
                    <Header>
                        <p />
                        <p>Sykmeldingsperiode</p>
                        <p>Gradering</p>
                    </Header>
                    <Body>
                        {periode.map((dag, i) => (
                            <Rad
                                key={i}
                                disabled={dag.type === Dagtype.Helg}
                                background={backgroundForRow(dag.oppgave)}
                            >
                                <Perioderad.Status status={dag.oppgave} />
                                <Perioderad.Sykmeldingsperiode {...dag} status={dag.oppgave} i={i} />
                                <Perioderad.Gradering {...dag} status={dag.oppgave} i={i} />
                            </Rad>
                        ))}
                    </Body>
                </Tabell>
            </PeriodetabellContainer>
        </PeriodeContext.Provider>
    );
};

export default Periodetabell;
