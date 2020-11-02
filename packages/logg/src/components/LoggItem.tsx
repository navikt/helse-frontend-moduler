import React from 'react';
import styles from './LoggItem.less';
import { HendelseMedId } from '../types';
import classNames from 'classnames';

export interface LoggItemProps {
    hendelse: HendelseMedId;
    className?: string;
}

export const LoggItem = ({ hendelse, className }: LoggItemProps) => (
    <li className={classNames(styles.loggItem, className)}>
        <p className={styles.hendelsesnavn}>{hendelse.navn}</p>
        <p className={styles.hendelsesdato}>{hendelse.dato}</p>
        {hendelse.beskrivelse && hendelse.beskrivelse}
    </li>
);
