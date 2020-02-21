import React, { useState } from 'react';
import Tabell from '../index';
import { Body, Header, Rad } from '../Tabell';
import Perioderad from './Perioderad';
import Overstyring from './Overstyring';
import PeriodeContext from './PeriodeContext';
import { Dag, Dagtype } from './types';
import styles from './Periodetabell.less';
import classNames from 'classnames';

export interface PeriodetabellProps {
    dager: Dag[];
    setDager?: (nyeDager: Dag[]) => void;
    className?: string;
}

const clamp = (value: number, min = 0, max = 100) => Math.max(Math.min(value, max), min);

const Periodetabell = ({ dager = [], setDager }: PeriodetabellProps) => {
    const [overstyrer, setOverstyrer] = useState(false);

    const oppdaterGradering = (index: number, nyGradering: number) => {
        if (!setDager) return;
        const gradering = clamp(isNaN(nyGradering) ? 0 : nyGradering);
        const nyeDager = dager.map((dag, i) => (i === index ? { ...dag, gradering } : dag));
        setDager(nyeDager);
    };

    const oppdaterType = (index: number, nyType: Dagtype) => {
        if (!setDager) return;
        const nyeDager = dager.map((dag, i) => (i === index ? { ...dag, type: nyType } : dag));
        setDager(nyeDager);
    };

    return (
        <PeriodeContext.Provider value={{ dager, oppdaterGradering, oppdaterType, overstyrer }}>
            <div className={styles.container}>
                {setDager && <Overstyring åpen={overstyrer} onOverstyring={() => setOverstyrer(o => !o)} />}
                <Tabell>
                    <Header>
                        <p />
                        <p>Sykmeldingsperiode</p>
                        <p>Gradering</p>
                    </Header>
                    <Body>
                        {dager.map((dag, i) => (
                            <Rad
                                className={classNames(
                                    dag.oppgave && styles[dag.oppgave],
                                    dag.type === Dagtype.Helg && styles.disabled
                                )}
                                key={i}
                            >
                                <Perioderad.Status status={dag.oppgave} />
                                <Perioderad.Sykmeldingsperiode {...dag} status={dag.oppgave} i={i} />
                                <Perioderad.Gradering {...dag} status={dag.oppgave} i={i} />
                            </Rad>
                        ))}
                    </Body>
                </Tabell>
            </div>
        </PeriodeContext.Provider>
    );
};

export default Periodetabell;
