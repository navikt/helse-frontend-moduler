import React from 'react';
import styles from './LoggItem.less';
import { Hendelse, Hendelsestatus } from '../types';
import classNames from 'classnames';

interface LoggItemProps {
    hendelse: Hendelse;
}

const LoggItem = ({ hendelse }: LoggItemProps) => (
    <li className={classNames(styles.loggItem, styles[hendelse.status ?? Hendelsestatus.Normal])}>
        <p className={styles.hendelsesnavn}>{hendelse.navn}</p>
        <p className={styles.hendelsesdato}>{hendelse.dato}</p>
        {hendelse.beskrivelse && hendelse.beskrivelse}
    </li>
);

export default LoggItem;
