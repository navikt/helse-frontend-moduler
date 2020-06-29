import React, { ReactNode } from 'react';
import styles from './Tooltip.less';

interface TooltipProps {
    children: ReactNode | ReactNode[];
}

const Tooltip = ({ children }: TooltipProps) => {
    return <div className={styles.tooltip}>{children}</div>;
};

export default Tooltip;
