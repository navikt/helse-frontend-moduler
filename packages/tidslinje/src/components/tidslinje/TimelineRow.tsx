import React from 'react';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import { TimelinePeriod } from './TimelinePeriod';
import { PositionedPeriod } from '../types.internal';

interface TimelineRowProps {
    periods: PositionedPeriod[];
    onSelectPeriod?: (periode: PositionedPeriod) => void;
    active?: boolean;
}

export const TimelineRow = ({ periods, onSelectPeriod, active = false }: TimelineRowProps) => (
    <div className={classNames('tidslinjerad', styles.perioder, active && styles.aktivRad)}>
        <hr />
        {periods.map(period => (
            <TimelinePeriod key={period.id} period={period} onSelectPeriod={onSelectPeriod} active={period.active} />
        ))}
    </div>
);
