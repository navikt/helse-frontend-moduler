import React, { useContext } from 'react';
import styles from './LoggListe.less';
import { LoggItem } from './LoggItem';
import { LoggContext } from '../LoggContext';
import { HendelseMedId } from '../types';

export const LoggListe = () => {
    const { aktivtFilter, hendelser } = useContext(LoggContext);
    return (
        <ul className={styles.list}>
            {hendelser.filter(aktivtFilter).map((hendelse: HendelseMedId) => (
                <LoggItem key={hendelse.id} hendelse={hendelse} className={hendelse.className} />
            ))}
        </ul>
    );
};
