import React, { useContext } from 'react';
import { kildelenke, Status, StatusProps, Sykmeldingsperiode } from '../Perioderad';
import UtbetalingContext from './UtbetalingContext';
import styles from './Utbetalingsrad.less';
import SykmeldingContext from '../sykmeldingstabell/SykmeldingContext';
import { Dagstatus, Kilde } from '../types';

interface UtbetalingProps extends StatusProps {
    i: number;
    utbetaling?: number | string;
    feilmelding?: string;
}

const Utbetaling = ({ utbetaling, i, status, feilmelding }: UtbetalingProps) => {
    const { overstyrer, oppdaterUtbetaling } = useContext(UtbetalingContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        oppdaterUtbetaling(i, parseInt(event.target.value));

    const formatertUtbetaling =
        typeof utbetaling === 'string' || utbetaling === undefined ? utbetaling : `${utbetaling} kr`;

    const renderUtbetaling = overstyrer ? (
        <input type="number" value={utbetaling || ''} onInput={onChange} />
    ) : (
        <span>{formatertUtbetaling}</span>
    );

    return (
        <div className={styles.utbetaling}>
            {renderUtbetaling}
            {status === Dagstatus.Advarsel && (
                <>
                    {feilmelding}
                    <a className={styles.oppgavelenke} href="#">
                        Gå til oppgave
                    </a>
                </>
            )}
            {status === Dagstatus.Feil && feilmelding}
        </div>
    );
};

export interface GraderingProps extends StatusProps {
    i: number;
    kilde?: Kilde;
    gradering?: number;
}

export const Gradering = ({ gradering, kilde, status, i }: GraderingProps) => {
    const { overstyrer, oppdaterGradering } = useContext(SykmeldingContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => oppdaterGradering(i, parseInt(event.target.value));

    const renderGradering = overstyrer ? (
        <input type="number" value={gradering || ''} onInput={onChange} />
    ) : (
        <span>{`${gradering}%`}</span>
    );

    return (
        <div className={styles.gradering}>
            {gradering !== undefined && renderGradering}
            {kilde && kildelenke(kilde)}
        </div>
    );
};

export default { Status, Sykmeldingsperiode, Gradering, Utbetaling };
