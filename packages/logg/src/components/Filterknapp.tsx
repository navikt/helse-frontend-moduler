import React, { ReactNode } from 'react';
import styles from './Filterknapp.less';
import classNames from 'classnames';

interface FilterknappProps {
    children: ReactNode;
    onClick: () => void;
    aktiv?: boolean;
    disabled?: boolean;
}

export const Filterknapp = ({ children, onClick, aktiv, disabled }: FilterknappProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={classNames(styles.knapp, aktiv && styles.aktivKnapp, disabled && styles.disabled)}
    >
        {children}
    </button>
);
