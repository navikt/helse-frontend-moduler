import React, { ReactNode } from 'react';
import styles from './BehandletAvInfotrygdVarsel.less';
import classNames from 'classnames';

export interface BehandletAvInfotrygdProps {
    tittel: string;
    children?: ReactNode | ReactNode[];
    className?: string;
}

export const BehandletAvInfotrygdVarsel = ({ tittel, children, className }: BehandletAvInfotrygdProps) => (
    <div className={classNames(styles.behandletAvInfotrygd, !children && styles.noChildren, className)}>
        <p className={styles.tittel}>{tittel}</p>
        {children}
    </div>
);
