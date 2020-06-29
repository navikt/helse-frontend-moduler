import React, { useCallback } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import { AktivPeriodeBakgrunn, AktivPeriodeBorder } from './AktivPeriode';
import Tidslinjerad from './Tidslinjerad';
import Skalaetiketter from './Skalaetiketter';
import { Dayjs } from 'dayjs';
import { EnkelPeriode, Periode } from '../types.external';
import { senesteDato, tidligsteDato, useTidslinjerader } from './useTidslinjerader';
import { InternalEnkelTidslinje, Intervall, PosisjonertPeriode } from '../types.internal';

export interface TidslinjeProps {
    /**
     * Enkelttidslinjer med tilhørende perioder.
     */
    rader: Periode[][];
    /**
     * Tidligste dato som skal vises visuelt på tidslinjen.
     */
    startDato?: Date;
    /**
     * Seneste dato som skal vises visuelt på tidslinjen.
     */
    sluttDato?: Date;
    /**
     * Handling som skal skje når en bruker klikker/interagerer med en periodeknapp.
     */
    onSelectPeriode?: (periode: Periode) => void;
    /**
     * Perioden som skal være aktiv/valgt.
     */
    aktivPeriode?: EnkelPeriode;
}

export interface InternalTidslinjeProps {
    rader: InternalEnkelTidslinje[];
    startDato: Dayjs;
    sluttDato: Dayjs;
    onSelectPeriode?: (periode: Periode) => void;
    aktivPeriode?: EnkelPeriode;
}

interface TidslinjeContextType {
    onSelectPeriode: (periode: PosisjonertPeriode) => void;
    aktivtIntervall?: Intervall;
    timelinePixelWidth?: number;
}

export const TidslinjeContext = React.createContext<TidslinjeContextType>({
    onSelectPeriode: _ => null
});

const _Tidslinje = React.memo(
    ({ rader, startDato, sluttDato, onSelectPeriode, aktivPeriode }: InternalTidslinjeProps) => {
        const onSelectPeriodeWrapper = useCallback(
            (periode: PosisjonertPeriode) => {
                onSelectPeriode?.({
                    id: periode.id,
                    fom: periode.fom.toDate(),
                    tom: periode.tom.toDate(),
                    disabled: periode.disabled,
                    status: periode.status
                });
            },
            [onSelectPeriode]
        );

        return (
            <div className={classNames('tidslinje', styles.tidslinje)}>
                <Skalaetiketter start={startDato} slutt={sluttDato} />
                <div className={classNames('tidslinjerader', styles.rader)}>
                    <AktivPeriodeBakgrunn
                        tidslinjestart={startDato}
                        tidslinjeslutt={sluttDato}
                        aktivPeriode={aktivPeriode}
                    />
                    {rader.map(tidslinje => (
                        <Tidslinjerad
                            key={tidslinje.id}
                            {...tidslinje}
                            onSelectPeriode={onSelectPeriodeWrapper}
                            aktivPeriode={aktivPeriode}
                        />
                    ))}
                    <AktivPeriodeBorder
                        tidslinjestart={startDato}
                        tidslinjeslutt={sluttDato}
                        aktivPeriode={aktivPeriode}
                    />
                </div>
            </div>
        );
    }
);

export const Tidslinje = React.memo(
    ({ startDato, sluttDato, rader, onSelectPeriode, aktivPeriode }: TidslinjeProps) => {
        if (!rader) throw new Error('Tidslinjen mangler verdi for "rader"-propen.');

        const _startDato = tidligsteDato({ startDato, rader });
        const _sluttDato = senesteDato({ sluttDato, rader });
        const _rader = useTidslinjerader(rader, _startDato, _sluttDato);

        return (
            <_Tidslinje
                rader={_rader}
                startDato={_startDato}
                sluttDato={_sluttDato}
                onSelectPeriode={onSelectPeriode}
                aktivPeriode={aktivPeriode}
            />
        );
    }
);
