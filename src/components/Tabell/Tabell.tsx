import React, { ReactNode } from 'react';
import { Table, TableRow } from './Tabell.styles';

type Children = { children: ReactNode[] };

interface RadProps extends Children {
    disabled?: boolean;
    background?: string;
}

export const Header = ({ children }: Children) => (
    <thead>
        <tr>
            {children.map((node, i) => (
                <th key={i}>{node}</th>
            ))}
        </tr>
    </thead>
);

export const Footer = ({ children }: Children) => (
    <tfoot>
        <tr>
            {children.map((node, i) => (
                <td key={i}>{node}</td>
            ))}
        </tr>
    </tfoot>
);

export const Body = ({ children }: Children) => {
    return <tbody>{children}</tbody>;
};

export const Rad = ({ children, disabled, background }: RadProps) => {
    const cells = children.map((cell, i) => <td key={i}>{cell}</td>);
    return (
        <TableRow disabled={disabled} background={background}>
            {cells}
        </TableRow>
    );
};

/**
 * `Tabell` er en wrapper-komponent rundt `table` med minimal styling.
 * Utseendemessig minner den om [tabellen i designsystemet](https://design.nav.no/components/tabell) til Nav men
 * tilpasset internflater med lavere radhøyde for å kunne vise flere rader på én gang uten at brukeren må scrolle.
 */
const Tabell = ({ children }: Children) => {
    return <Table>{children}</Table>;
};

export default Tabell;
