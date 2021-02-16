import React, { useState } from 'react';
import { Pin } from './types';
import dayjs, { Dayjs } from 'dayjs';
import { position } from './calc';
import styles from './Pins.less';

const PinView = ({ render, style }: Partial<Pin>) => {
    const [showRender, setShowRender] = useState(false);
    return (
        <div
            style={style}
            className={styles.pin}
            onMouseOver={() => setShowRender(true)}
            onMouseLeave={() => setShowRender(false)}
        >
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

const withinInterval = (pin: Pin, start: Dayjs, slutt: Dayjs) => {
    const pinDate = dayjs(pin.date);
    return pinDate >= start && pinDate <= slutt;
};

export const Pins = ({ pins, start, slutt, direction = 'left' }: PinsProps) => {
    const _start = dayjs(start).startOf('day');
    const _slutt = dayjs(slutt).endOf('day');
    return (
        <div className={styles.pins}>
            {pins
                .filter((pin) => withinInterval(pin, _start, _slutt))
                .map(({ date, render, style }, i) => (
                    <span
                        key={i}
                        className={styles.container}
                        style={{ [direction]: `${position(dayjs(date), _start, _slutt)}%` }}
                    >
                        <PinView render={render} style={style} />
                    </span>
                ))}
        </div>
    );
};
