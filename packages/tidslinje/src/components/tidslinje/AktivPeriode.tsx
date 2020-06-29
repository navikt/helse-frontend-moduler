import React from 'react';
import styles from './AktivPeriode.less';
import classNames from 'classnames';
import { EnkelPeriode } from '../types.external';
import dayjs, { Dayjs } from 'dayjs';
import { breddeMellomDatoer } from './calc';

interface IntervallProps {
    tidslinjestart: Dayjs;
    tidslinjeslutt: Dayjs;
    aktivPeriode?: EnkelPeriode;
}

interface UsePositionAndSizeOptions {
    aktivPeriode: EnkelPeriode;
    tidslinjestart: Dayjs;
    tidslinjeslutt: Dayjs;
}

const constrain = (value: number, min: number, max: number) => (value >= max ? max : value < min ? min : value);

const usePositionAndSize = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: UsePositionAndSizeOptions) => {
    const fom = dayjs(aktivPeriode.fom).startOf('day');
    const tom = dayjs(aktivPeriode.tom).endOf('day');
    const totaltAntallDager = tidslinjeslutt.diff(tidslinjestart, 'day');

    const left = breddeMellomDatoer(tom, tidslinjeslutt, totaltAntallDager);
    const adjustedLeft = constrain(left, 0, 100);

    const width = breddeMellomDatoer(fom, tom, totaltAntallDager);
    const adjustedWidth =
        adjustedLeft + width >= 100 ? 100 - adjustedLeft : adjustedLeft + width !== left + width ? width + left : width;

    if (left >= 100 || adjustedWidth <= 0) {
        return {
            left: 0,
            width: 0,
            display: 'none'
        };
    } else if (left < 0) {
        return {
            left: 0,
            width: `${adjustedWidth}%`
        };
    } else {
        return {
            left: `${adjustedLeft}%`,
            width: `${adjustedWidth}%`,
            display: left > 100 ? 'none' : undefined
        };
    }
};

export const AktivPeriodeBorder = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: IntervallProps) => {
    if (!aktivPeriode) return null;
    const style = usePositionAndSize({ aktivPeriode, tidslinjestart, tidslinjeslutt });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBorder)} style={style} />
        </div>
    );
};

export const AktivPeriodeBakgrunn = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: IntervallProps) => {
    if (!aktivPeriode) return null;
    const style = usePositionAndSize({ aktivPeriode, tidslinjestart, tidslinjeslutt });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBakgrunn)} style={style} />
        </div>
    );
};
