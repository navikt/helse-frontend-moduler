import React, { ReactNode } from 'react';
import styles from './Filterknapp.less';
import classNames from 'classnames';

interface FilterknappProps {
    children: ReactNode;
    onClick: () => void;
    aktiv?: boolean;
}

const Filterknapp = ({ children, onClick, aktiv }: FilterknappProps) => {
    return (
        <button onClick={onClick} className={classNames(styles.knapp, aktiv && styles.aktivKnapp)}>
            {children}
        </button>
    );
};

export default Filterknapp;
