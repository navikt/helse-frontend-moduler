import React, { useState } from 'react';
import styles from './Hendelsesoversikt.less';
import { Hendelse, Hendelsetype } from './types';
import Historikkknapp from './components/Historikkknapp';
import Meldingerknapp from './components/Meldingerknapp';
import Dokumenterknapp from './components/Dokumenterknapp';
import classNames from 'classnames';
import HendelseItem from './components/HendelseItem';

export interface HendelsesoversiktProps {
    className?: string;
    hendelser?: Hendelse[];
}

const påHendelsestype = (type: Hendelsetype) => (hendelse: Hendelse) =>
    type === Hendelsetype.Historikk || hendelse.type === type;

const tilHendelseItem = (hendelse: Hendelse) => (
    <HendelseItem key={hendelse.id} hendelse={hendelse} />
);

const Hendelsesoversikt = ({ hendelser, className }: HendelsesoversiktProps) => {
    const [aktivtFilter, setAktivtFilter] = useState<Hendelsetype>(Hendelsetype.Historikk);

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
                />
                <Dokumenterknapp
                    aktiv={aktivtFilter === Hendelsetype.Dokumenter}
                    onClick={() => setAktivtFilter(Hendelsetype.Dokumenter)}
                />
            </div>
            <ul className={styles.list}>
                {hendelser?.filter(påHendelsestype(aktivtFilter)).map(tilHendelseItem)}
            </ul>
        </div>
    );
};

export default Hendelsesoversikt;
