import React, { ReactNode } from 'react';
import styles from './Sakslinje.less';

export interface SaksmenyProps {
    venstre?: ReactNode | ReactNode[];
    midt?: ReactNode | ReactNode[];
    høyre?: ReactNode | ReactNode[];
}

const Sakslinje = ({ venstre, midt, høyre }: SaksmenyProps) => {
    return (
        <div className={styles.sakslinje}>
            <div>{venstre}</div>
            <span className={styles.divider} />
            <div>{midt}</div>
            <span className={styles.divider} />
            <div>{høyre}</div>
        </div>
    );
};

export default Sakslinje;
