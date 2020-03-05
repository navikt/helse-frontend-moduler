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
            {venstre}
            {midt && (
                <>
                    <span className={styles.divider} />
                    {midt}
                </>
            )}
            {høyre && (
                <>
                    <span className={styles.divider} />
                    {høyre}
                </>
            )}
        </div>
    );
};

export default Sakslinje;
