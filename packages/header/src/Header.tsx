import React, { ReactNode, useState } from 'react';
import IkonSystem from '../icons/IkonSystem';
import classNames from 'classnames';
import styles from './Header.less';

export type Brukerinfo = {
    navn: string;
    ident: string;
    enhet?: string;
    rolle?: string;
};

export interface HeaderProps {
    tittel: ReactNode;
    brukerinfo: Brukerinfo;
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

const Header = ({ tittel, children, brukerinfo }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.rad}>
                <h1 className={styles.tittel}>{tittel}</h1>
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
        </header>
    );
};

export default Header;
