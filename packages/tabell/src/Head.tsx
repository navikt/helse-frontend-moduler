import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import styles from './Head.less';
import { tilTabellHeader } from './map';
import { Header } from './types';
import { Sortering } from './sortering';
import { Filter, Filtrering } from './filtrering';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import NavFrontendChevron from 'nav-frontend-chevron';
import 'nav-frontend-popover-style/dist/main.css';
import 'nav-frontend-chevron-style/dist/main.css';

export interface TabellHeader {
    /**
     * Det som skal rendres i `th`-elementet.
     */
    render: ReactNode;
    /**
     * Funksjon som kalles når bruker klikker på headeren.
     */
    onClick?: (val?: any) => void;
    /**
     * Angir antall kolonner headeren strekker seg over
     */
    kolonner?: number;
}

export interface SorterbarTabellHeader extends TabellHeader {
    sortFunction: (a: ReactNode, b: ReactNode) => number;
    onClick: () => void;
}

export interface FiltrerbarTabellHeader extends TabellHeader {
    filtere: Filter[];
    onClick: (filter: Filter) => void;
}

interface KolonneHeaderProps {
    children: ReactNode | ReactNode[];
    kolonner?: number;
}

const KolonneHeader = ({ children, kolonner = 1 }: KolonneHeaderProps) => (
    <th scope="col" colSpan={kolonner}>
        {children}
    </th>
);

interface SorterbarHeaderProps {
    children: ReactNode | ReactNode[];
    onSort: () => void;
    direction?: 'ascending' | 'descending' | 'none';
    kolonner?: number;
}

const SorterbarHeader = ({ children, direction, onSort, kolonner = 1 }: SorterbarHeaderProps) => (
    <th scope="col" aria-sort={direction} colSpan={kolonner}>
        <button className={classNames('sortknapp', styles.sortHeader, direction && styles[direction])} onClick={onSort}>
            {children}
        </button>
    </th>
);

interface FilterMenuItemProps {
    children: ReactNode | ReactNode[];
    onFilter: () => void;
    aktiv: boolean;
}

const FilterMenuItem = ({ children, onFilter, aktiv }: FilterMenuItemProps) => (
    <li>
        <label className={styles.filterLabel}>
            <input type="checkbox" checked={aktiv} onChange={onFilter} />
            {children}
        </label>
    </li>
);

interface FiltrerbarHeaderProps {
    children: ReactNode | ReactNode[];
    onFilter: (filter: Filter | Filter[], override?: boolean) => void;
    filtere: Filter[];
    aktiveFiltere: Filter[];
    kolonner?: number;
}

const FiltrerbarHeader = ({ children, filtere, onFilter, aktiveFiltere, kolonner = 1 }: FiltrerbarHeaderProps) => {
    const [anchor, setAnchor] = useState<HTMLElement | undefined>(undefined);

    const alleFiltereErAktive = filtere.every((filter) =>
        aktiveFiltere.find((aktivtFilter) => aktivtFilter.label === filter.label)
    );

    return (
        <th scope="col" colSpan={kolonner}>
            <button
                className={classNames('filterknapp', styles.filterHeader, open && styles.open)}
                onClick={(e) => (!anchor ? setAnchor(e.currentTarget) : setAnchor(undefined))}
                tabIndex={0}
            >
                {children}
                <NavFrontendChevron className={styles.filterHeaderChevron} type={anchor ? 'opp' : 'ned'} />
            </button>
            <Popover
                tabIndex={-1}
                orientering={PopoverOrientering.UnderVenstre}
                autoFokus={false}
                utenPil
                ankerEl={anchor}
                onRequestClose={() => setAnchor(undefined)}
            >
                <ul className={styles.filterList}>
                    <FilterMenuItem
                        onFilter={() => {
                            onFilter(filtere, !alleFiltereErAktive);
                            setAnchor(undefined);
                        }}
                        aktiv={alleFiltereErAktive}
                    >
                        {alleFiltereErAktive ? 'Opphev alle' : 'Velg alle'}
                    </FilterMenuItem>
                    <hr />
                    {filtere.map((filter, i) => (
                        <FilterMenuItem
                            key={filter.label as string}
                            onFilter={() => {
                                onFilter(filter);
                            }}
                            aktiv={
                                aktiveFiltere.find((aktivtFilter) => aktivtFilter.label === filter.label) !== undefined
                            }
                        >
                            {filter.label}
                        </FilterMenuItem>
                    ))}
                </ul>
            </Popover>
        </th>
    );
};

interface HeadProps {
    headere: (ReactNode | Header)[];
    sortering?: Sortering;
    filtrering?: Filtrering;
}

export const Head = ({ headere, sortering, filtrering }: HeadProps) => (
    <thead>
        <tr>
            {headere.map(tilTabellHeader).map((header, i) => {
                return (header as FiltrerbarTabellHeader).filtere ? (
                    <FiltrerbarHeader
                        key={i}
                        onFilter={(header as FiltrerbarTabellHeader).onClick}
                        filtere={(header as FiltrerbarTabellHeader).filtere}
                        aktiveFiltere={
                            filtrering?.filtere.filter(({ active }) => active).map(({ filter }) => filter) ?? []
                        }
                    >
                        {header.render}
                    </FiltrerbarHeader>
                ) : header.onClick ? (
                    <SorterbarHeader
                        key={i}
                        onSort={(header as SorterbarTabellHeader).onClick}
                        direction={i === sortering?.kolonne ? sortering.direction : undefined}
                    >
                        {header.render}
                    </SorterbarHeader>
                ) : (
                    <KolonneHeader key={i} kolonner={header.kolonner}>
                        {header.render}
                    </KolonneHeader>
                );
            })}
        </tr>
    </thead>
);
