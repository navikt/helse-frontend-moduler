import React, { useContext } from 'react';
import styles from './LoggListe.less';
import { LoggItem } from './LoggItem';
import { LoggContext } from '../LoggContext';
import { HendelseMedId } from '../types';
import classNames from 'classnames';

interface LoggListeProps {
    className?: string;
}

export const LoggListe = ({ className }: LoggListeProps) => {
    const { aktivtFilter, hendelser } = useContext(LoggContext);
    return (
        <ul className={classNames(styles.list, className)}>
            {hendelser.filter(aktivtFilter).map((hendelse: HendelseMedId) => (
                <LoggItem key={hendelse.id} hendelse={hendelse} className={hendelse.className} />
            ))}
        </ul>
    );
};
