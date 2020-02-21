import React, { ReactNode } from 'react';
import styles from './Select.less';

interface SelectProps {
    children: ReactNode | ReactNode[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ children, onChange }: SelectProps) => {
    return (
        <div className={styles.container}>
            <select className={styles.select} onChange={onChange}>
                {children}
            </select>
        </div>
    );
};

export default Select;
