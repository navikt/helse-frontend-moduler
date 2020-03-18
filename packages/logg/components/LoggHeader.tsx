import React, { useContext } from 'react';
import Historikkknapp from './Historikkknapp';
import { Hendelsetype } from '../types';
import Meldingerknapp from './Meldingerknapp';
import Dokumenterknapp from './Dokumenterknapp';
import { LoggContext } from '../LoggContext';
import styles from './LoggHeader.less';

const LoggHeader = () => {
    const { aktivtFilter, setAktivtFilter, hendelser } = useContext(LoggContext);

    const harMeldinger = hendelser?.find(hendelse => hendelse.type === Hendelsetype.Meldinger) !== undefined;

    return (
        <div className={styles.header}>
            <Historikkknapp
                aktiv={aktivtFilter === Hendelsetype.Historikk}
                onClick={() => setAktivtFilter(Hendelsetype.Historikk)}
            />
            <Meldingerknapp
                aktiv={aktivtFilter === Hendelsetype.Meldinger}
                onClick={() => setAktivtFilter(Hendelsetype.Meldinger)}
                disabled={!harMeldinger}
            />
            <Dokumenterknapp
                aktiv={aktivtFilter === Hendelsetype.Dokumenter}
                onClick={() => setAktivtFilter(Hendelsetype.Dokumenter)}
            />
        </div>
    );
};

export default LoggHeader;
