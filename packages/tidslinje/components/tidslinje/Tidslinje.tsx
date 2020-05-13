import React, { useEffect, useState } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import Intervaller from './Intervaller';
import Tidslinjerad from './Tidslinjerad';
import Skalaetiketter from './Skalaetiketter';
import dayjs, { Dayjs } from 'dayjs';
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
    aktivPeriode?: Periode;
}

export interface InternalTidslinjeProps {
    rader: InternalEnkelTidslinje[];
    startDato: Dayjs;
    sluttDato: Dayjs;
    onSelectPeriode?: (periode: Periode) => void;
    aktivPeriode?: Periode;
}

const Tidslinje = ({ rader, startDato, sluttDato, onSelectPeriode, aktivPeriode }: InternalTidslinjeProps) => {
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
            id: periode.id,
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

    useEffect(() => {
        if (aktivPeriode) {
            aktiverIntervallForPeriode({
                fom: dayjs(aktivPeriode.fom).startOf('day'),
                tom: dayjs(aktivPeriode.tom).endOf('day')
            });
        }
    }, [aktivPeriode]);

    return (
        <div className={classNames('tidslinje', styles.tidslinje)}>
            <Skalaetiketter start={startDato} slutt={sluttDato} />
            <div className={classNames('tidslinjerader', styles.rader)}>
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

export default ({ startDato, sluttDato, rader, onSelectPeriode, aktivPeriode }: TidslinjeProps) => {
    const _startDato = tidligsteDato({ startDato, rader });
    const _sluttDato = senesteDato({ sluttDato, rader });
    const _rader = useTidslinjerader(rader, _startDato, _sluttDato);

    return (
        <Tidslinje
            rader={_rader}
            startDato={_startDato}
            sluttDato={_sluttDato}
            onSelectPeriode={onSelectPeriode}
            aktivPeriode={aktivPeriode}
        />
    );
};
