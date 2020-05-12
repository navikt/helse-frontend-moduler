import React, { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb';
import { Percentage, Skalaetikett } from '../types.internal';
import styles from './Skalaetiketter.less';
import classNames from 'classnames';
import { breddeMellomDatoer } from './calc';
import { erSynlig } from './filter';

dayjs.locale('nb');

interface SkalaetiketterProps {
    start: Dayjs;
    slutt: Dayjs;
}

export const posisjonFraVenstre = (dato: Dayjs, tidslinjeStart: Dayjs, tidslinjeSlutt: Dayjs): Percentage => {
    const dagerEtterDato = tidslinjeSlutt.diff(dato, 'day');
    const antallTidslinjedager = tidslinjeSlutt.diff(tidslinjeStart, 'day');
    return (dagerEtterDato / antallTidslinjedager) * 100;
};

const formatertDag = (dato: Dayjs): string => dato.format('DD.MM');

const formatertMåned = (dato: Dayjs): string => {
    const månedLabel = dato.format('MMM');
    return månedLabel[0].toUpperCase().concat(månedLabel.slice(1, 3));
};

const formatertÅr = (dato: Dayjs): string => `${dato.year()}`;

export const dagsetiketter = (start: Dayjs, slutt: Dayjs, totaltAntallDager: number, inkrement = 2): Skalaetikett[] => {
    const førsteDag = start.startOf('day');
    return new Array(totaltAntallDager)
        .fill(førsteDag)
        .map((denneDagen, i) => {
            if (i % inkrement !== 0) return null;
            const dag = denneDagen.add(i, 'day');
            return {
                left: breddeMellomDatoer(dag, slutt, totaltAntallDager),
                label: formatertDag(dag)
            };
        })
        .filter(etikett => etikett !== null) as Skalaetikett[];
};

export const månedsetiketter = (start: Dayjs, slutt: Dayjs, totaltAntallDager: number): Skalaetikett[] => {
    const førsteMåned = start.startOf('month');
    const antallMåneder = Math.ceil(slutt.diff(start, 'month', true)) + 1;
    return new Array(antallMåneder).fill(førsteMåned).map((denneMåneden, i) => {
        const måned = denneMåneden.add(i, 'month');
        return {
            left: breddeMellomDatoer(måned, slutt, totaltAntallDager),
            label: formatertMåned(måned)
        };
    });
};

export const årsetiketter = (start: Dayjs, slutt: Dayjs, totaltAntallDager: number): Skalaetikett[] => {
    const førsteÅr = start.startOf('year');
    const antallÅr = Math.ceil(slutt.diff(start, 'year', true)) + 1;
    return new Array(antallÅr).fill(førsteÅr).map((detteÅret, i) => {
        const år = detteÅret.add(i, 'year');
        console.log(år.year(), breddeMellomDatoer(år, slutt, totaltAntallDager));
        return {
            left: breddeMellomDatoer(år, slutt, totaltAntallDager),
            label: formatertÅr(år)
        };
    });
};

const skalaEtiketter = (start: Dayjs, slutt: Dayjs): Skalaetikett[] => {
    const totaltAntallDager = slutt.diff(start, 'day');
    if (totaltAntallDager < 40) {
        return dagsetiketter(start, slutt, totaltAntallDager);
    } else if (totaltAntallDager < 370) {
        return månedsetiketter(start, slutt, totaltAntallDager);
    } else {
        return årsetiketter(start, slutt, totaltAntallDager);
    }
};

const Skalaetiketter = ({ start, slutt }: SkalaetiketterProps) => {
    const etiketter = useMemo(() => skalaEtiketter(start, slutt).filter(erSynlig), [start, slutt]);
    return (
        <div className={classNames('skalaetiketter', styles.skalaetiketter)}>
            {etiketter.map(etikett => (
                <div key={etikett.label} className={styles.etikett} style={{ left: `${etikett.left}%` }}>
                    {etikett.label}
                </div>
            ))}
        </div>
    );
};

export default Skalaetiketter;
