import React from 'react';
import classNames from 'classnames';
import styles from './Row.less';

export interface RowProps {
    className?: string;
}

export const Row: React.FC<RowProps> = ({ className, children }) => {
    return <div className={classNames('row', styles.row, className)}>{children}</div>;
};
