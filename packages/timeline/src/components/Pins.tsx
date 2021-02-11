import React, { useState } from 'react';
import { Pin } from './types';
import dayjs from 'dayjs';
import { position } from './calc';
import styles from './Pins.less';

const PinView = ({ render }: Partial<Pin>) => {
    const [showRender, setShowRender] = useState(false);
    return (
        <div className={styles.pin} onMouseOver={() => setShowRender(true)} onMouseLeave={() => setShowRender(false)}>
            {showRender && render}
        </div>
    );
};

export interface PinsProps {
    pins: Pin[];
    start: Date;
    slutt: Date;
    direction: 'left' | 'right';
}

export const Pins = ({ pins, start, slutt, direction = 'left' }: PinsProps) => {
    const _start = dayjs(start).startOf('day');
    const _slutt = dayjs(slutt).endOf('day');
    return (
        <div className={styles.pins}>
            {pins.map(({ date, render }, i) => (
                <span
                    key={i}
                    className={styles.container}
                    style={{ [direction]: `calc(9px + ${position(dayjs(date), _start, _slutt)}%)` }}
                >
                    <PinView render={render} />
                </span>
            ))}
        </div>
    );
};
