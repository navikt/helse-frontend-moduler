import React from 'react';
import styles from '../Hendelsesoversikt.less';
import { Hendelse } from '../types';

interface HendelseItemProps {
    hendelse: Hendelse;
}

const HendelseItem = ({ hendelse }: HendelseItemProps) => (
    <li>
        <p className={styles.hendelsesnavn}>{hendelse.navn}</p>
        {hendelse.beskrivelse && (
            <p className={styles.hendelsesbeskrivelse}>{hendelse.beskrivelse}</p>
        )}
        <p className={styles.hendelsesdato}>{hendelse.dato}</p>
    </li>
);

export default HendelseItem;
