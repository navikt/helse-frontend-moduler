import React, { ReactNode } from 'react';
import styles from './Skalaknapp.less';

interface SkalaknappProps {
    onClick: (event: React.MouseEvent) => void;
    selected: boolean;
    children: ReactNode | ReactNode[];
}

const Skalaknapp = ({ selected, children, onClick }: SkalaknappProps) => {
    const className = selected ? styles.skalaKnappSelected : styles.skalaknapp;
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Skalaknapp;
