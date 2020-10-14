import React, { ReactNode, useCallback } from 'react';
import styles from './Tidslinje.less';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { AxisLabels } from './AxisLabels';
import { TimelineRow } from './TimelineRow';
import { Periode } from '../types.external';
import { AxisLabel, InternalSimpleTimeline, PositionedPeriod } from '../types.internal';
import { useSenesteDato, useTidligsteDato, useTidslinjerader } from './useTidslinjerader';

export interface TidslinjeProps {
    /**
     * Perioder som rendres på tidslinjen. Rendres som 'button' dersom 'onSelectPeriode' er satt, ellers som en 'div'.
     * Hver liste av `Periode`-objekter representerer en egen rad i tidslinjen.
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
     * Raden som skal markeres som aktiv.
     */
    aktivRad?: number;
    /**
     * Retningen periodene sorteres på. Default er 'stigende', hvor tidligste periode da vil rendres til venstre i
     * tidslinjen og seneste periode vil rendres til høyre.
     */
    retning?: 'stigende' | 'synkende';
    /**
     * Funksjon som tar en etikett og returnerer det som skal rendres.
     */
    etikettRender?: (etikett: AxisLabel) => ReactNode;
}

export interface TimelineProps {
    rows: InternalSimpleTimeline[];
    start: Dayjs;
    direction: 'left' | 'right';
    endInclusive: Dayjs;
    activeRow?: number;
    onSelectPeriod?: (periode: Periode) => void;
    axisLabelRenderer?: (etikett: AxisLabel) => ReactNode;
}

const Timeline = React.memo(
    ({ rows, start, endInclusive, onSelectPeriod, activeRow, direction, axisLabelRenderer }: TimelineProps) => {
        const onSelectPeriodeWrapper =
            onSelectPeriod &&
            useCallback(
                (periode: PositionedPeriod) => {
                    onSelectPeriod?.({
                        id: periode.id,
                        fom: periode.start.toDate(),
                        tom: periode.endInclusive.toDate(),
                        disabled: periode.disabled,
                        status: periode.status
                    });
                },
                [onSelectPeriod]
            );

        return (
            <div className={classNames('tidslinje', styles.tidslinje)}>
                <AxisLabels
                    start={start}
                    slutt={endInclusive}
                    direction={direction}
                    etikettRender={axisLabelRenderer}
                />
                <div className={classNames('tidslinjerader', styles.rader)}>
                    {rows.map((tidslinje, i) => (
                        <TimelineRow
                            key={tidslinje.id}
                            {...tidslinje}
                            onSelectPeriod={onSelectPeriodeWrapper}
                            active={i === activeRow}
                        />
                    ))}
                </div>
            </div>
        );
    }
);

/**
 * Viser perioder i en tidslinje.
 */
export const Tidslinje = React.memo(
    ({
        rader,
        aktivRad,
        startDato,
        sluttDato,
        etikettRender,
        onSelectPeriode,
        retning = 'stigende'
    }: TidslinjeProps) => {
        if (!rader) throw new Error('Tidslinjen mangler rader.');

        const direction = retning === 'stigende' ? 'left' : 'right';
        const start = useTidligsteDato({ startDato, rader }).startOf('day');
        const endInclusive = useSenesteDato({ sluttDato, rader }).endOf('day');
        const rows = useTidslinjerader(rader, start, endInclusive, direction);

        return (
            <Timeline
                rows={rows}
                start={start}
                activeRow={aktivRad}
                direction={direction}
                endInclusive={endInclusive}
                onSelectPeriod={onSelectPeriode}
                axisLabelRenderer={etikettRender}
            />
        );
    }
);
