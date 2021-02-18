import React, { ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styles from './AxisLabels.less';
import classNames from 'classnames';
import { AxisLabel } from './types';
import 'dayjs/locale/nb';
import { position } from './calc';

dayjs.locale('nb');

const formatertDag = (dato: Dayjs): string => dato.format('DD.MM');

const formatertMåned = (dato: Dayjs): string => {
    const månedLabel = dato.format('MMM');
    return månedLabel[0].toUpperCase().concat(månedLabel.slice(1, 3));
};

const formatertÅr = (dato: Dayjs): string => `${dato.year()}`;

const erSynlig = ({ horizontalPosition }: AxisLabel): boolean => horizontalPosition <= 100 && horizontalPosition >= 0;

export const dagsetiketter = (
    start: Dayjs,
    slutt: Dayjs,
    totaltAntallDager: number,
    direction: 'left' | 'right'
): AxisLabel[] => {
    const inkrement = Math.ceil(totaltAntallDager / 10);
    const sisteDag = slutt.startOf('day');
    return new Array(totaltAntallDager)
        .fill(sisteDag)
        .map((denneDagen, i) => {
            if (i % inkrement !== 0) return null;
            const dag: Dayjs = denneDagen.subtract(i, 'day');
            const horizontalPosition = position(dag, start, slutt);
            const width = position(dag.add(1, 'day'), start, slutt) - horizontalPosition;
            return {
                direction: direction,
                horizontalPosition: horizontalPosition,
                label: formatertDag(dag),
                date: dag.toDate(),
                width: width,
            };
        })
        .filter((etikett) => etikett !== null) as AxisLabel[];
};

export const månedsetiketter = (start: Dayjs, slutt: Dayjs, direction: 'left' | 'right'): AxisLabel[] => {
    const startmåned = start.startOf('month');
    const sluttmåned = slutt.endOf('month');
    const antallMåneder = sluttmåned.diff(startmåned, 'month') + 1;
    return new Array(antallMåneder).fill(startmåned).map((denneMåneden, i) => {
        const måned: Dayjs = denneMåneden.add(i, 'month');
        const horizontalPosition = position(måned, start, slutt);
        const width = position(måned.add(1, 'month'), start, slutt) - horizontalPosition;
        return {
            direction: direction,
            horizontalPosition: horizontalPosition,
            label: formatertMåned(måned),
            date: måned.toDate(),
            width: width,
        };
    });
};

export const årsetiketter = (start: Dayjs, slutt: Dayjs, direction: 'left' | 'right'): AxisLabel[] => {
    const førsteÅr = start.startOf('year');
    const sisteÅr = slutt.endOf('year');
    const antallÅr = sisteÅr.diff(start, 'year') + 1;
    return new Array(antallÅr).fill(førsteÅr).map((detteÅret, i) => {
        const år: Dayjs = detteÅret.add(i, 'year');
        const horizontalPosition = position(år, start, slutt);
        const width = position(år.add(1, 'year'), start, slutt) - horizontalPosition;
        return {
            direction: direction,
            horizontalPosition: horizontalPosition,
            label: formatertÅr(år),
            date: år.toDate(),
            width: width,
        };
    });
};

const axisLabels = (start: Dayjs, slutt: Dayjs, direction: 'left' | 'right'): AxisLabel[] => {
    const totaltAntallDager = slutt.diff(start, 'day');
    if (totaltAntallDager < 40) {
        return dagsetiketter(start, slutt, totaltAntallDager, direction);
    } else if (totaltAntallDager < 370) {
        return månedsetiketter(start, slutt, direction);
    } else {
        return årsetiketter(start, slutt, direction);
    }
};

export interface AxisLabelsProps {
    start: Dayjs;
    slutt: Dayjs;
    direction?: 'left' | 'right';
    etikettRender?: (etikett: AxisLabel) => ReactNode;
}

export const AxisLabels: React.FC<AxisLabelsProps> = ({
    start,
    slutt,
    direction = 'left',
    etikettRender,
}: AxisLabelsProps): JSX.Element => {
    const _start = dayjs(start).startOf('day');
    const _slutt = dayjs(slutt).endOf('day');
    const labels = axisLabels(_start, _slutt, direction).filter(erSynlig);
    return (
        <div className={classNames('etiketter', styles.etiketter)}>
            {labels.map((etikett) => (
                <div
                    key={etikett.label}
                    style={{
                        display: 'flex',
                        justifyContent: direction === 'left' ? 'flex-start' : 'flex-end',
                        [direction]: `${etikett.horizontalPosition}%`,
                        width: `${etikett.width}%`,
                    }}
                >
                    {etikettRender?.(etikett) ?? etikett.label}
                </div>
            ))}
        </div>
    );
};
