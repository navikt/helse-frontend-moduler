import React, { ReactNode } from 'react';
import styles from './Tabell.less';

type TableElementProps = {
    children: ReactNode | ReactNode[];
    className?: string;
};

const asArray = (children: ReactNode | ReactNode[]) =>
    Array.isArray(children) ? children : [children];

export const Header = ({ children }: TableElementProps) => (
    <thead>
        <tr>
            {asArray(children).map((node, i) => (
                <th key={i}>{node}</th>
            ))}
        </tr>
    </thead>
);

export const Footer = ({ children }: TableElementProps) => (
    <tfoot>
        <tr>
            {asArray(children).map((node, i) => (
                <td key={i}>{node}</td>
            ))}
        </tr>
    </tfoot>
);

export const Body = ({ children }: TableElementProps) => {
    return <tbody>{children}</tbody>;
};

export const Rad = ({ children, className }: TableElementProps) => {
    const cells = asArray(children).map((cell, i) => <td key={i}>{cell}</td>);
    return <tr className={className}>{cells}</tr>;
};

/**
 * `Tabell` er en wrapper-komponent rundt `table` med minimal styling.
 * Utseendemessig minner den om [tabellen i designsystemet](https://design.nav.no/components/tabell) til Nav men
 * tilpasset internflater med lavere radhøyde for å kunne vise flere rader på én gang uten at brukeren må scrolle.
 */
const Tabell = ({ children }: TableElementProps) => {
    return <table className={styles.table}>{children}</table>;
};

export default Tabell;
