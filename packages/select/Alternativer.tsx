import React from 'react';
import { Alternativ } from './Select';
import styles from './Alternativer.less';

interface AlternativerProps {
    alternativer: Alternativ[];
    isVisible: boolean;
    onClick(alternativ: Alternativ): void;
    onKeyPress(event: React.KeyboardEvent<HTMLLIElement>, alternativ: Alternativ): void;
}

export const Alternativer = ({ alternativer, isVisible, onClick, onKeyPress }: AlternativerProps) => {
    return (
        <ul className={styles.list} hidden={!isVisible} tabIndex={-1} role="listbox">
            {alternativer.map((item: Alternativ) => (
                <li
                    className={styles.alternativ}
                    key={item.id}
                    role="option"
                    tabIndex={0}
                    onClick={() => onClick(item)}
                    onKeyPress={(event: React.KeyboardEvent<HTMLLIElement>) => onKeyPress(event, item)}
                >
                    {item.value}
                </li>
            ))}
        </ul>
    );
};
