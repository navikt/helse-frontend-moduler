import React, { ReactNode } from 'react';
import styles from './Tooltip.less';
import classNames from 'classnames';

interface TooltipProps {
    children: ReactNode | ReactNode[];
    className?: string;
}

export const Tooltip = ({ children, className }: TooltipProps) => (
    <div className={classNames(className, styles.tooltip)}>{children}</div>
);
