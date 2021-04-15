import React, {CSSProperties} from 'react';
import classNames from 'classnames';

import styles from './Period.less';

export interface PeriodProps {
    id: string;
    style?: CSSProperties;
    onClick?: (id: string) => void;
    tabIndex?: number;
    className?: string;
}

export const Period: React.FC<PeriodProps> = React.forwardRef<HTMLButtonElement, PeriodProps>(
    ({ className, children, style, onClick, id, tabIndex = 0}, ref) => (
        <button
            tabIndex={tabIndex}
            ref={ref}
            style={style}
            className={classNames('period', className, styles.period)}
            onClick={() => onClick?.(id)}
        >
            {children}
        </button>
    )
);
