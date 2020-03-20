import React, { useState } from 'react';
import Tabell from '../../index';
import { Body, Header, Rad } from '../../Tabell';
import Perioderad from '../Perioderad';
import Overstyring from '../Overstyring';
import SykmeldingContext from './SykmeldingContext';
import { Dag, Dagtype } from '../types';
import styles from '../Periodetabell.less';
import classNames from 'classnames';

export interface PeriodetabellProps {
    dager: Dag[];
    setDager?: (nyeDager: Dag[]) => void;
    className?: string;
}

const Sykmeldingstabell = ({ dager = [], setDager, className }: PeriodetabellProps) => {
    const [overstyrer, setOverstyrer] = useState(false);

    function oppdaterFelt<T>(index: number, nyVerdi: T, feltNavn: string) {
        if (!setDager) return;
        const nyeDager = dager.map((dag, i) => (i === index ? { ...dag, [feltNavn]: nyVerdi } : dag));
        setDager(nyeDager);
    }

    const oppdaterGradering = (index: number, nyGradering: number) => {
        oppdaterFelt(index, nyGradering, 'gradering');
    };

    const oppdaterType = (index: number, nyType: Dagtype) => {
        oppdaterFelt(index, nyType, 'type');
    };

    return (
        <SykmeldingContext.Provider value={{ dager, oppdaterGradering, oppdaterType, overstyrer }}>
            <div className={classNames(styles.container, className)}>
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
                                    dag.status && styles[dag.status],
                                    dag.type === Dagtype.Helg && styles.disabled
                                )}
                                key={i}
                            >
                                <Perioderad.Status status={dag.status} />
                                <Perioderad.Sykmeldingsperiode {...dag} status={dag.status} i={i} />
                                <Perioderad.Gradering {...dag} status={dag.status} i={i} />
                            </Rad>
                        ))}
                    </Body>
                </Tabell>
            </div>
        </SykmeldingContext.Provider>
    );
};

export default Sykmeldingstabell;
