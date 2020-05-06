import React, { useEffect, useState } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import Intervaller from './Intervaller';
import Tidslinjerad from './Tidslinjerad';
import Skalaetiketter from './Skalaetiketter';
import { Dayjs } from 'dayjs';
import { erLike } from './calc';
import { useIntervaller } from './useIntervaller';
import { EnkelTidslinje, Periode } from '../types.external';
import { senesteDato, tidligsteDato, useTidslinjerader } from './useTidslinjerader';
import { EnkelPeriode, InternalEnkelTidslinje, Intervall, PosisjonertPeriode } from '../types.internal';

export interface TidslinjeProps {
    rader: EnkelTidslinje[];
    startDato?: Date;
    sluttDato?: Date;
    onSelectPeriode?: (periode: Periode) => void;
}

export interface InternalTidslinjeProps {
    rader: InternalEnkelTidslinje[];
    startDato: Dayjs;
    sluttDato: Dayjs;
    onSelectPeriode?: (periode: Periode) => void;
}

const Tidslinje = ({ rader, startDato, sluttDato, onSelectPeriode }: InternalTidslinjeProps) => {
    const [intervaller, setIntervaller] = useIntervaller(rader, startDato, sluttDato);
    const [aktivtIntervall, setAktivtIntervall] = useState<Intervall>();

    const aktiverIntervallForPeriode = (periode: EnkelPeriode) => {
        setIntervaller(intervaller =>
            intervaller.map(intervall => ({
                ...intervall,
                active: erLike(periode, intervall)
            }))
        );
    };

    const onSelectPeriodeWrapper = (periode: PosisjonertPeriode) => {
        onSelectPeriode?.({
            fom: periode.fom.toDate(),
            tom: periode.tom.toDate(),
            disabled: periode.disabled,
            status: periode.status
        });
        !periode.disabled && aktiverIntervallForPeriode(periode);
    };

    useEffect(() => {
        setAktivtIntervall(intervaller.find(intervall => intervall.active) || intervaller[0]);
    }, [intervaller]);

    return (
        <div className={classNames('tidslinje', styles.tidslinje)}>
            <Skalaetiketter start={startDato} slutt={sluttDato} />
            <div className={styles.rader}>
                <Intervaller intervaller={intervaller} />
                {rader.map(tidslinje => (
                    <Tidslinjerad
                        key={tidslinje.id}
                        {...tidslinje}
                        aktivtIntervall={aktivtIntervall}
                        onSelectPeriode={onSelectPeriodeWrapper}
                    />
                ))}
            </div>
        </div>
    );
};

export default ({ startDato, sluttDato, rader, onSelectPeriode }: TidslinjeProps) => {
    const _startDato = tidligsteDato({ startDato, rader });
    const _sluttDato = senesteDato({ sluttDato, rader });
    const _rader = useTidslinjerader(rader, _startDato, _sluttDato);

    return <Tidslinje rader={_rader} startDato={_startDato} sluttDato={_sluttDato} onSelectPeriode={onSelectPeriode} />;
};
