import React, { ReactElement, ReactNode } from 'react';
import { Table, TableRow } from './Tabell.styles'

type Children = { children: ReactNode[]; };
type Disabled = { disabled?: boolean; }

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

export const Rad = ({ children, disabled }: Children & Disabled) => {
    const cells = children.map((cell, i) => <td key={i}>{cell}</td>)
    return (
        <TableRow disabled={disabled}>
            {cells}
        </TableRow>
    );
};

const Tabell = ({ children }: Children) => {
    return <Table>{children}</Table>;
};

export default Tabell;
