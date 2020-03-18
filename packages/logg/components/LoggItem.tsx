import React from 'react';
import styles from '../Logg.less';
import { Hendelse } from '../types';

interface LoggItemProps {
    hendelse: Hendelse;
}

const LoggItem = ({ hendelse }: LoggItemProps) => (
    <li>
        <p className={styles.hendelsesnavn}>{hendelse.navn}</p>
        {hendelse.beskrivelse && <p className={styles.hendelsesbeskrivelse}>{hendelse.beskrivelse}</p>}
        <p className={styles.hendelsesdato}>{hendelse.dato}</p>
    </li>
);

export default LoggItem;
