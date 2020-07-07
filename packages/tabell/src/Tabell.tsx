import React, { ReactNode } from 'react';
import styles from './Tabell.less';
import classNames from 'classnames';
import { Head, TabellHeader } from './Head';
import { Sortering } from './sortering';
import { Filtrering } from './filtrering';

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
    /**
     * Forteller tabellen hvilke filtere som er aktive.
     */
    filtrering?: Filtrering;
}

const Body = ({ rader }: { rader: ReactNode[][] }) => (
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

const Footer = ({ footere }: { footere: ReactNode[] }) => (
    <tfoot>
        <tr>
            {Object.values(footere).map((value, i) => (
                <td key={i}>{value}</td>
            ))}
        </tr>
    </tfoot>
);

export const Tabell = ({
    rader = [],
    className,
    beskrivelse,
    headere,
    footere,
    sortering,
    filtrering
}: TabellProps) => (
    <table className={classNames('Tabell', styles.table, className)}>
        {beskrivelse && <caption className={styles.caption}>{beskrivelse}</caption>}
        {headere && <Head headere={headere} sortering={sortering} filtrering={filtrering} />}
        <Body rader={rader} />
        {footere && <Footer footere={footere} />}
    </table>
);
