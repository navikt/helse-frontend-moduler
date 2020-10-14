import React, { ReactNode } from 'react';
import styles from './Tooltip.less';

interface TooltipProps {
    children: ReactNode | ReactNode[];
}

export const Tooltip = ({ children }: TooltipProps) => <div className={styles.tooltip}>{children}</div>;
