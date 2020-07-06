import React, { ReactNode } from 'react';
import styles from './Tabell.less';
import classNames from 'classnames';
import { Head, TabellHeader } from './Head';

export interface Sortering {
    /**
     * Retningen det sorteres i.
     */
    direction: 'ascending' | 'descending' | 'none';
    /**
     * Kolonneindeksen det sorteres på.
     */
    kolonne?: number;
}

export interface TabellProps {
    /**
     * En tekstlig beskrivelse som ikke er synlig men fanges opp av skjermlesere.
     */
    beskrivelse: string;
    /**
     * Radene som skal vises i tabellen.
     */
    rader: ReactNode[][];
    /**
     * Headere som vises øverst i tabellen.
     */
    headere?: (ReactNode | TabellHeader)[];
    /**
     * Footere som vises nederst i tabellen.
     */
    footere?: ReactNode[];
    /**
     * Legges på det ytterste `table`-elementet i komponenten.
     */
    className?: string;
    /**
     * Forteller tabellen hvordan radene er sortert.
     */
    sortering?: Sortering;
}

const Body = <T,>({ rader }: { rader: T[][] }) => {
    return (
        <tbody>
            {rader.map(rad => (
                <tr key={`${rad[0]}`}>
                    {rad.map(element => (
                        <td key={`${element}`}>{element}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

const Footer = <T,>({ footere }: { footere: ReactNode[] }) => (
    <tfoot>
        <tr>
            {Object.values(footere).map((value, i) => (
                <td key={i}>{value}</td>
            ))}
        </tr>
    </tfoot>
);

export const Tabell = <T,>({ rader = [], className, beskrivelse, headere, footere, sortering }: TabellProps) => (
    <table className={classNames(styles.table, className)}>
        {beskrivelse && <caption className={styles.caption}>{beskrivelse}</caption>}
        {headere && <Head headere={headere} sortering={sortering} />}
        <Body rader={rader} />
        {footere && <Footer footere={footere} />}
    </table>
);
