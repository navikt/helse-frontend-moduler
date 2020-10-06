import React, { ReactNode, useCallback } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import { AktivtUtsnittBakgrunn, AktivtUtsnittBorder } from './AktivtUtsnitt';
import Tidslinjerad from './Tidslinjerad';
import Skalaetiketter from './Skalaetiketter';
import { Dayjs } from 'dayjs';
import { EnkelPeriode, Periode } from '../types.external';
import { useSenesteDato, useTidligsteDato, useTidslinjerader } from './useTidslinjerader';
import { InternalEnkelTidslinje, Intervall, PosisjonertPeriode, Skalaetikett } from '../types.internal';

export interface TidslinjeProps {
    /**
     * Tidslinjer bestående av perioder. Periodene rendres som egne periodeknapper på tidslinjen. Hver liste av
     * `Periode`-objekter representerer en egen rad i tidslinjen.
     */
    rader: Periode[][];
    /**
     * Bestemmer startpunktet for tidslinjen. Defaulter til tidligste dato blandt alle perioder i tidslinjen.
     */
    startDato?: Date;
    /**
     * Bestemmer sluttpunktet for tidslinjen. Defaulter til seneste dato blandt alle perioder i tidslinjen.
     */
    sluttDato?: Date;
    /**
     * Handling som skal skje når en bruker klikker på/interagerer med en periodeknapp.
     */
    onSelectPeriode?: (periode: Periode) => void;
    /**
     * Utsnittet av tidslinjen som skal markeres som aktivt.
     */
    aktivtUtsnitt?: EnkelPeriode;
    /**
     * Raden som skal markeres som aktiv.
     */
    aktivRad?: number;
    /**
     * Retningen tidslinjen beveger seg mot fra tidligste til seneste dato. Default er 'left', hvor tidligste dato er
     * til høyre og seneste til venstre.
     */
    direction?: 'left' | 'right';
    /**
     * Funksjon som tar en etikett og returnerer det som skal rendres.
     */
    etikettRender?: (etikett: Skalaetikett) => ReactNode;
}

export interface InternalTidslinjeProps {
    rader: InternalEnkelTidslinje[];
    startDato: Dayjs;
    sluttDato: Dayjs;
    onSelectPeriode?: (periode: Periode) => void;
    aktivtUtsnitt?: EnkelPeriode;
    aktivRad?: number;
    direction: 'left' | 'right';
    etikettRender?: (etikett: Skalaetikett) => ReactNode;
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
    ({
        rader,
        startDato,
        sluttDato,
        onSelectPeriode,
        aktivtUtsnitt,
        aktivRad,
        direction,
        etikettRender
    }: InternalTidslinjeProps) => {
        const onSelectPeriodeWrapper =
            onSelectPeriode &&
            useCallback(
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
                <Skalaetiketter
                    start={startDato}
                    slutt={sluttDato}
                    direction={direction}
                    etikettRender={etikettRender}
                />
                <div className={classNames('tidslinjerader', styles.rader)}>
                    {aktivtUtsnitt && (
                        <AktivtUtsnittBakgrunn
                            tidslinjestart={startDato}
                            tidslinjeslutt={sluttDato}
                            aktivtUtsnitt={aktivtUtsnitt}
                            direction={direction}
                        />
                    )}
                    {rader.map((tidslinje, i) => (
                        <Tidslinjerad
                            key={tidslinje.id}
                            {...tidslinje}
                            onSelectPeriode={onSelectPeriodeWrapper}
                            erAktiv={i === aktivRad}
                        />
                    ))}
                    {aktivtUtsnitt && (
                        <AktivtUtsnittBorder
                            tidslinjestart={startDato}
                            tidslinjeslutt={sluttDato}
                            aktivtUtsnitt={aktivtUtsnitt}
                            direction={direction}
                        />
                    )}
                </div>
            </div>
        );
    }
);

/**
 * Viser perioder på en horisontal tidslinje. Komponenten er kontrollert ved at den tar imot en prop, `aktivtUtsnitt`,
 * som forteller den utsnitt av tidslinjen som skal markeres som aktiv.
 */
export const Tidslinje = React.memo(
    ({
        startDato,
        sluttDato,
        rader,
        onSelectPeriode,
        aktivtUtsnitt,
        aktivRad,
        direction = 'left',
        etikettRender
    }: TidslinjeProps) => {
        if (!rader) throw new Error('Tidslinjen mangler verdi for "rader"-propen.');

        const _startDato = useTidligsteDato({ startDato, rader });
        const _sluttDato = useSenesteDato({ sluttDato, rader });
        const _rader = useTidslinjerader(rader, _startDato, _sluttDato, direction);

        return (
            <_Tidslinje
                rader={_rader}
                startDato={_startDato}
                sluttDato={_sluttDato}
                onSelectPeriode={onSelectPeriode}
                aktivtUtsnitt={aktivtUtsnitt}
                aktivRad={aktivRad}
                direction={direction}
                etikettRender={etikettRender}
            />
        );
    }
);
