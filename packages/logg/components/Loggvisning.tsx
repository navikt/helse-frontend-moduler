import React, { useContext } from 'react';
import styles from './Loggvisning.less';
import { LoggContext } from '../LoggContext';
import { Hendelse, Hendelsetype } from '../types';
import LoggItem from './LoggItem';

const påHendelsestype = (type: Hendelsetype) => (hendelse: Hendelse) =>
    type === Hendelsetype.Historikk || hendelse.type === type;

const tilHendelseItem = (hendelse: Hendelse) => <LoggItem key={hendelse.id} hendelse={hendelse} />;

const Loggvisning = () => {
    const { hendelser, aktivtFilter } = useContext(LoggContext);

    return <ul className={styles.list}>{hendelser?.filter(påHendelsestype(aktivtFilter)).map(tilHendelseItem)}</ul>;
};

export default Loggvisning;
