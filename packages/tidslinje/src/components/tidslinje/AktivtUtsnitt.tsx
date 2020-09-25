import React from 'react';
import styles from './AktivtUtsnitt.less';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { EnkelPeriode } from '../types.external';
import { usePositionAndSize } from './usePositionAndSize';

interface IntervallProps {
    tidslinjestart: Dayjs;
    tidslinjeslutt: Dayjs;
    aktivtUtsnitt: EnkelPeriode;
    direction: 'left' | 'right';
}

export const AktivtUtsnittBorder = ({ aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction }: IntervallProps) => {
    const style = usePositionAndSize({ periode: aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBorder)} style={style} />
        </div>
    );
};

export const AktivtUtsnittBakgrunn = ({ aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction }: IntervallProps) => {
    const style = usePositionAndSize({ periode: aktivtUtsnitt, tidslinjestart, tidslinjeslutt, direction });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.aktivPeriodeBakgrunn)} style={style} />
        </div>
    );
};
