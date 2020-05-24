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

const usePositionAndSize = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: UsePositionAndSizeOptions) => {
    const fom = dayjs(aktivPeriode.fom);
    const tom = dayjs(aktivPeriode.tom);
    const totaltAntallDager = tidslinjeslutt.diff(tidslinjestart, 'day');

    const left = `${breddeMellomDatoer(tom, tidslinjeslutt, totaltAntallDager)}%`;
    const width = `${breddeMellomDatoer(tom, fom, totaltAntallDager)}%`;
    return { left, width };
};

export const AktivPeriodeBorder = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: IntervallProps) => {
    if (!aktivPeriode) return null;
    const { left, width } = usePositionAndSize({ aktivPeriode, tidslinjestart, tidslinjeslutt });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBorder)} style={{ left, width }} />
        </div>
    );
};

export const AktivPeriodeBakgrunn = ({ aktivPeriode, tidslinjestart, tidslinjeslutt }: IntervallProps) => {
    if (!aktivPeriode) return null;
    const { left, width } = usePositionAndSize({ aktivPeriode, tidslinjestart, tidslinjeslutt });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBakgrunn)} style={{ left, width }} />
        </div>
    );
};
