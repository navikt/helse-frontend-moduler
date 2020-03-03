import React, { useState } from 'react';
import { Dag, Dagtype } from '../types';
import UtbetalingContext from './UtbetalingContext';
import Overstyring from '../Overstyring';
import { Body, Footer, Header, Rad } from '../../Tabell';
import classNames from 'classnames';
import Utbetalingsrad from './Utbetalingsrad';
import styles from '../Periodetabell.less';
import Tabell from '../../index';

interface Utbetalingstabell {
    dager: Dag[];
    setDager?: (nyeDager: Dag[]) => void;
    className?: string;
}

const Utbetalingstabell = ({ dager = [], setDager, className }: Utbetalingstabell) => {
    const [overstyrer, setOverstyrer] = useState(false);

    const utbetalingerTotalt = dager.reduce((totalt, dagen) => totalt + (dagen.utbetaling ?? 0), 0);

    function oppdaterFelt<T>(index: number, nyVerdi: T, feltNavn: string) {
        if (!setDager) return;
        const nyeDager = dager.map((dag, i) =>
            i === index ? { ...dag, [feltNavn]: nyVerdi } : dag
        );
        setDager(nyeDager);
    }

    const oppdaterGradering = (index: number, nyGradering: number) => {
        oppdaterFelt(index, nyGradering, 'gradering');
    };

    const oppdaterType = (index: number, nyType: Dagtype) => {
        oppdaterFelt(index, nyType, 'type');
    };

    const oppdaterUtbetaling = (index: number, nyUtbetaling: number) => {
        oppdaterFelt(index, nyUtbetaling, 'utbetaling');
    };

    return (
        <UtbetalingContext.Provider
            value={{ dager, oppdaterGradering, oppdaterType, oppdaterUtbetaling, overstyrer }}
        >
            <div className={classNames(styles.container, className)}>
                {setDager && (
                    <Overstyring åpen={overstyrer} onOverstyring={() => setOverstyrer(o => !o)} />
                )}
                <Tabell>
                    <Header>
                        <p />
                        <p>Sykmeldingsperiode</p>
                        <p>Gradering</p>
                        <p>Utbetaling</p>
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
                                <Utbetalingsrad.Status status={dag.oppgave} />
                                <Utbetalingsrad.Sykmeldingsperiode
                                    {...dag}
                                    status={dag.oppgave}
                                    i={i}
                                />
                                <Utbetalingsrad.Gradering {...dag} i={i} />
                                <Utbetalingsrad.Utbetaling {...dag} status={dag.oppgave} i={i} />
                            </Rad>
                        ))}
                    </Body>
                    <Footer>
                        <p />
                        <p>Totalt</p>
                        <p />
                        <p>{utbetalingerTotalt} kr</p>
                    </Footer>
                </Tabell>
            </div>
        </UtbetalingContext.Provider>
    );
};

export default Utbetalingstabell;
