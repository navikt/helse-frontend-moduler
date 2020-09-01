import React, { ReactNode } from 'react';
import styles from './Tooltip.less';
import classNames from 'classnames';

interface TooltipProps {
    children: ReactNode | ReactNode[];
    className?: string;
}

const Tooltip = ({ children, className }: TooltipProps) => {
    return <div className={classNames(styles.tooltip, className)}>{children}</div>;
};

export default Tooltip;
