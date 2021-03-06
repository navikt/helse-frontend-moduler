import React, { useState } from 'react';
import { Pin } from '../types.external';
import dayjs, { Dayjs } from 'dayjs';
import { position } from './calc';
import styles from './Pins.less';
import { Tooltip } from './Tooltip';

const PinView = ({ render }: Partial<Pin>) => {
    const [showRender, setShowRender] = useState(false);
    return (
        <div className={styles.pin} onMouseOver={() => setShowRender(true)} onMouseLeave={() => setShowRender(false)}>
            {showRender && render && <Tooltip className={styles.tooltip}>{render}</Tooltip>}
        </div>
    );
};

interface PinsProps {
    pins: Pin[];
    start: Dayjs;
    slutt: Dayjs;
    direction: 'left' | 'right';
}

export const Pins = ({ pins, start, slutt, direction }: PinsProps) => (
    <div className={styles.pins}>
        {pins.map(({ date, render }, i) => (
            <span
                key={i}
                className={styles.container}
                style={{ [direction]: `${position(dayjs(date), start, slutt)}%` }}
            >
                <PinView render={render} />
            </span>
        ))}
    </div>
);
