import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Tabell.less';
import { Sortering } from './Tabell';

export interface TabellHeader {
    /**
     * Det som skal rendres i `th`-elementet.
     */
    render: ReactNode;
    /**
     * Beskriver hvordan radene skal sorteres basert på innholdet i kolonnen.
     */
    sortFunction?: (a: ReactNode, b: ReactNode) => number;
    /**
     * Filter-funksjoner som bestemmer hvordan radene skal funne filtreres basert på innholdet i kolonnen.
     */
    filtere?: ((value: ReactNode) => boolean)[];
    /**
     * Funksjon som kalles når bruker klikker på headeren.
     */
    onClick?: () => void;
}

export interface SorterbarTabellHeader {
    onSort: () => void;
    direction: 'ascending' | 'descending' | 'none';
}

const erTabellHeader = (header: ReactNode | TabellHeader): boolean => (header as TabellHeader).render !== undefined;

const toTabellHeader = (header: ReactNode | TabellHeader): TabellHeader =>
    (erTabellHeader(header) ? header : { render: header }) as TabellHeader;

interface KolonneHeaderProps {
    children: ReactNode | ReactNode[];
}

const KolonneHeader = ({ children }: KolonneHeaderProps) => <th scope="col">{children}</th>;

interface SorterbarHeaderProps {
    children: ReactNode | ReactNode[];
    onSort: () => void;
    direction?: 'ascending' | 'descending' | 'none';
}

const SorterbarHeader = ({ children, direction, onSort }: SorterbarHeaderProps) => (
    <th scope="col" aria-sort={direction}>
        <button className={classNames(styles.sortHeader, direction && styles[direction])} onClick={onSort}>
            {children}
        </button>
    </th>
);

interface HeadProps {
    headere: (ReactNode | TabellHeader)[];
    sortering?: Sortering;
}

export const Head = ({ headere, sortering }: HeadProps) => {
    const tabellheadere = headere.map(toTabellHeader);

    return (
        <thead>
            <tr>
                {tabellheadere.map((header, i) => {
                    return header.onClick ? (
                        <SorterbarHeader
                            key={i}
                            onSort={header.onClick}
                            direction={i === sortering?.kolonne ? sortering.direction : undefined}
                        >
                            {header.render}
                        </SorterbarHeader>
                    ) : (
                        <KolonneHeader key={i}>{header.render}</KolonneHeader>
                    );
                })}
            </tr>
        </thead>
    );
};
