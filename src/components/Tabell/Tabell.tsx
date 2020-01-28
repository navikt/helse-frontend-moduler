import React, { ReactElement, ReactNode } from 'react';
import { Table } from './Tabell.styles';

type Children = { children: ReactNode[] };

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
    const rows = children.map((row: ReactElement, i) => {
        const cells = row.props.children;
        return (
            <tr key={i}>{Array.isArray(cells) ? cells.map((cell, j) => <td key={j}>{cell}</td>) : <td>{cells}</td>}</tr>
        );
    });

    return <tbody>{rows}</tbody>;
};

const Tabell = ({ children }: Children) => {
    return <Table>{children}</Table>;
};

export default Tabell;
