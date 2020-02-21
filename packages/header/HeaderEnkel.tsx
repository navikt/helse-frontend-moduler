import React from 'react';
import { Brukerinfo, HeaderProps } from './Header';
import styles from './Header.less';
import classNames from 'classnames';

const Bruker = ({ navn, ident }: Brukerinfo) => (
    <div className={classNames(styles.rad, styles.gap)}>
        <div className={styles.avdeler} />
        <p className={styles.tekstNormal}>{navn}</p>
        <p className={styles.tekstLiten}>{ident}</p>
    </div>
);

const HeaderEnkel = ({ tittel, children, brukerinfo }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.rad}>
                <h1 className={styles.tittel}>{tittel}</h1>
                <div className={styles.avdeler} />
                {children}
            </div>
            <Bruker {...brukerinfo} />
        </div>
    );
};

export default HeaderEnkel;
