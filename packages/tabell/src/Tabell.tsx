import React, { ReactNode } from 'react';
import styles from './Tabell.less';
import classNames from 'classnames';
import { Head, TabellHeader } from './Head';
import { Sortering } from './sortering';
import { Filtrering } from './filtrering';
import { tilTabellrad } from './map';
import { Paginering, paginerteRader } from './paginering';

export interface Tabellrad {
    celler: ReactNode[];
    className?: string;
}

export type Tabellrader = (ReactNode | Tabellrad)[];

export type Tabellheadere = (ReactNode | TabellHeader)[];

export interface TabellProps {
    /**
     * En tekstlig beskrivelse som ikke er synlig men fanges opp av skjermlesere.
     */
    beskrivelse: string;
    /**
     * Radene som skal vises i tabellen.
     */
    rader: Tabellrader;
    /**
     * Headere som vises øverst i tabellen.
     */
    headere?: Tabellheadere;
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
    /**
     * Forteller tabellen hvordan tabellen skal pagineres.
     */
    paginering?: Paginering;
}

const Body = ({ rader, paginering }: { rader: Tabellrader; paginering?: Paginering }) => {
    const tabellrader = paginerteRader(rader, paginering) ?? rader;
    return (
        <tbody>
            {tabellrader.map(tilTabellrad).map((rad: Tabellrad, i) => (
                <tr key={i} className={classNames('Tabellrad', rad.className && rad.className)}>
                    {rad.celler.map((element, i) => (
                        <td key={i}>{element}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

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
    filtrering,
    paginering
}: TabellProps) => (
    <table className={classNames('Tabell', styles.table, className)}>
        {beskrivelse && <caption className={styles.caption}>{beskrivelse}</caption>}
        {headere && <Head headere={headere} sortering={sortering} filtrering={filtrering} />}
        <Body rader={rader} paginering={paginering} />
        {footere && <Footer footere={footere} />}
    </table>
);
