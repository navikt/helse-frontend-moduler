import React, { ReactNode } from 'react';
import styles from './BehandletAvInfotrygd.less';
import classNames from 'classnames';

export interface BehandletAvInfotrygdProps {
    tittel: string;
    children?: ReactNode | ReactNode[];
    className?: string;
}

const BehandletAvInfotrygd = ({ tittel, children, className }: BehandletAvInfotrygdProps) => {
    return (
        <div className={classNames(styles.behandletAvInfotrygd, !children && styles.noChildren, className)}>
            <p className={styles.tittel}>{tittel}</p>
            {children}
        </div>
    );
};

export default BehandletAvInfotrygd;
