import React, {CSSProperties} from 'react';
import classNames from 'classnames';

import styles from './Period.less';

export interface PeriodProps {
    id: string;
    style?: CSSProperties;
    onClick?: (id: string) => void;
    className?: string;
}

export const Period: React.FC<PeriodProps> = React.forwardRef<HTMLButtonElement, PeriodProps>(
    ({ className, children, style, onClick, id}, ref) => (
        <button
            ref={ref}
            style={style}
            className={classNames('period', className, styles.period)}
            onClick={() => onClick?.(id)}
        >
            {children}
        </button>
    )
);
