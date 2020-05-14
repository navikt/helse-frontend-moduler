import React, { useEffect, useRef, useState } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import Intervaller from './Intervaller';
import Tidslinjerad from './Tidslinjerad';
import Skalaetiketter from './Skalaetiketter';
import { Dayjs } from 'dayjs';
import { useIntervaller } from './useIntervaller';
import { EnkelTidslinje, Periode } from '../types.external';
import { senesteDato, tidligsteDato, useTidslinjerader } from './useTidslinjerader';
import { InternalEnkelTidslinje, Intervall, PosisjonertPeriode } from '../types.internal';

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

interface TidslinjeContextType {
    onSelectPeriode: (periode: PosisjonertPeriode) => void;
    aktivtIntervall?: Intervall;
    timelinePixelWidth?: number;
}

export const TidslinjeContext = React.createContext<TidslinjeContextType>({
    onSelectPeriode: _ => null,
    aktivtIntervall: undefined,
    timelinePixelWidth: undefined
});

const Tidslinje = ({ rader, startDato, sluttDato, onSelectPeriode }: InternalTidslinjeProps) => {
    const intervaller = useIntervaller(rader, startDato, sluttDato);
    const aktivtIntervall = intervaller.find(i => i.active);

    const timelineRef = useRef<HTMLDivElement>(null);
    const [timelinePixelWidth, setTimelinePixelWidth] = useState();

    const onSelectPeriodeWrapper = (periode: PosisjonertPeriode) => {
        onSelectPeriode?.({
            id: periode.id,
            fom: periode.fom.toDate(),
            tom: periode.tom.toDate(),
            disabled: periode.disabled,
            status: periode.status
        });
    };

    useEffect(() => {
        const resizeHandler = () => setTimelinePixelWidth(timelineRef.current?.offsetWidth);
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return (
        <div className={classNames('tidslinje', styles.tidslinje)} ref={timelineRef}>
            <Skalaetiketter start={startDato} slutt={sluttDato} />
            <div className={classNames('tidslinjerader', styles.rader)}>
                <Intervaller intervaller={intervaller} />
                <TidslinjeContext.Provider
                    value={{
                        onSelectPeriode: onSelectPeriodeWrapper,
                        aktivtIntervall,
                        timelinePixelWidth
                    }}
                >
                    {rader.map(tidslinje => (
                        <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                    ))}
                </TidslinjeContext.Provider>
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
