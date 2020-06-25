import React from 'react';
import styles from './LoggItem.less';
import { HendelseMedId } from '../types';
import classNames from 'classnames';

export interface LoggItemProps {
    hendelse: HendelseMedId;
}

export const LoggItem = ({ hendelse }: LoggItemProps) => (
    <li className={classNames(styles.loggItem, hendelse.status && styles[hendelse.status])}>
        <p className={styles.hendelsesnavn}>{hendelse.navn}</p>
        <p className={styles.hendelsesdato}>{hendelse.dato}</p>
        {hendelse.beskrivelse && hendelse.beskrivelse}
    </li>
);
