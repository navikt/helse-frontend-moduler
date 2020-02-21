import React, { ReactNode, useState } from 'react';
import IkonSystem from './icons/IkonSystem';
import classNames from 'classnames';
import styles from './Header.less';

export type Brukerinfo = {
    navn: string;
    ident: string;
    enhet?: string;
    rolle?: string;
};

export interface HeaderProps {
    tittel: string;
    brukerinfo: Brukerinfo;
    tittelHref?: string;
    children?: ReactNode | ReactNode[];
}

export const Bruker = ({ navn, ident, enhet, rolle }: Brukerinfo) => {
    const [åpen, setÅpen] = useState(false);

    return (
        <button className={classNames(åpen ? styles.lukkeknapp : styles.åpneknapp)} onClick={() => setÅpen(å => !å)}>
            <div className={classNames(styles.rad, styles.gap)}>
                <p className={styles.tekstNormal}>{navn}</p>
                <p className={styles.tekstLiten}>{ident}</p>
            </div>
            <p className={styles.tekstLiten}>
                {enhet}
                {rolle ? `, ${rolle}` : ''}
            </p>
        </button>
    );
};

const Header = ({ tittel, children, brukerinfo, tittelHref = '/' }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.rad}>
                <h1 className={styles.tittel}>
                    <a href={tittelHref}>{tittel}</a>
                </h1>
                <div className={styles.avdeler} />
                {children}
            </div>
            <div className={styles.rad}>
                <button className={styles.systemknapp}>
                    <IkonSystem />
                </button>
                <div className={styles.avdeler} />
                <Bruker {...brukerinfo} />
            </div>
        </div>
    );
};

export default Header;
