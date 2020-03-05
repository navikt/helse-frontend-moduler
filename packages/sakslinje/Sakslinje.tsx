import React, { ReactNode } from 'react';
import styles from './Sakslinje.less';
import classNames from 'classnames';

export interface SaksmenyProps {
    venstre?: ReactNode | ReactNode[];
    midt?: ReactNode | ReactNode[];
    høyre?: ReactNode | ReactNode[];
    className?: string;
}

const Sakslinje = ({ venstre, midt, høyre, className }: SaksmenyProps) => {
    return (
        <div className={classNames(styles.sakslinje, className)}>
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
