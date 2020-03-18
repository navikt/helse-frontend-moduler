import React, { useState } from 'react';
import styles from './Logg.less';
import { Hendelse, Hendelsetype } from './types';
import Historikkknapp from './components/Historikkknapp';
import Meldingerknapp from './components/Meldingerknapp';
import Dokumenterknapp from './components/Dokumenterknapp';
import classNames from 'classnames';
import LoggItem from './components/LoggItem';

export interface LoggProps {
    className?: string;
    hendelser?: Hendelse[];
}

const påHendelsestype = (type: Hendelsetype) => (hendelse: Hendelse) =>
    type === Hendelsetype.Historikk || hendelse.type === type;

const tilHendelseItem = (hendelse: Hendelse) => <LoggItem key={hendelse.id} hendelse={hendelse} />;

const Logg = ({ hendelser, className }: LoggProps) => {
    const [aktivtFilter, setAktivtFilter] = useState(Hendelsetype.Historikk);

    const harMeldinger = hendelser?.find(hendelse => hendelse.type === Hendelsetype.Meldinger) !== undefined;

    return (
        <div className={classNames(styles.container, className)}>
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
            <ul className={styles.list}>{hendelser?.filter(påHendelsestype(aktivtFilter)).map(tilHendelseItem)}</ul>
        </div>
    );
};

export default Logg;
