import React from 'react';
import { Pin } from '../types.external';
import dayjs, { Dayjs } from 'dayjs';
import { position } from './calc';
import styles from './Pins.less';

interface PinsProps {
    pins: Pin[];
    start: Dayjs;
    slutt: Dayjs;
    direction: 'left' | 'right';
}

export const Pins = ({ pins, start, slutt, direction }: PinsProps) => {
    return (
        <div className={styles.pins}>
            {pins.map(({ date, render }, i) => (
                <div
                    key={i}
                    className={styles.pin}
                    style={{ [direction]: `${position(dayjs(date), start, slutt)}%` }}
                />
            ))}
        </div>
    );
};
