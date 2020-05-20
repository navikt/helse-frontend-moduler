import React from 'react';
import styles from './Intervaller.less';
import classNames from 'classnames';
import { Intervall } from '../types.internal';

interface IntervallerProps {
    intervaller: Intervall[];
}

const Intervaller = ({ intervaller }: IntervallerProps) => (
    <div className={classNames('intervaller', styles.intervaller)}>
        {intervaller.map(intervall => (
            <div
                key={intervall.id}
                className={classNames(styles.intervall, intervall.active && styles.aktivtIntervall)}
                style={{ left: `${intervall.left}%`, width: `${intervall.width}%` }}
            />
        ))}
    </div>
);

export default Intervaller;
