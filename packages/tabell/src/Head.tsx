import React, { ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Head.less';
import { tilTabellHeader } from './map';
import { Header } from './types';
import { Sortering } from './sortering';
import { Filter, Filtrering } from './filtrering';

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
        <button className={classNames(styles.sortHeader, direction && styles[direction])} onClick={onSort}>
            {children}
        </button>
    </th>
);

interface UseOnInteractOutsideParameters {
    ref: React.RefObject<HTMLElement>;
    onInteractOutside: () => void;
    active: boolean;
}

const useOnInteractOutside = ({ ref, onInteractOutside, active }: UseOnInteractOutsideParameters) => {
    useEffect(() => {
        const onInteractWrapper = (event: FocusEvent | MouseEvent) => {
            if (active && !ref.current?.contains(event.target as HTMLElement)) onInteractOutside();
        };
        document.addEventListener('focusin', onInteractWrapper);
        document.addEventListener('click', onInteractWrapper);
        return () => {
            document.removeEventListener('focusin', onInteractWrapper);
            document.removeEventListener('click', onInteractWrapper);
        };
    }, [ref.current, active]);
};

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
    onFilter: (filter: Filter | Filter[]) => void;
    filtere: Filter[];
    aktiveFiltere: Filter[];
    kolonner?: number;
}

const FiltrerbarHeader = ({ children, filtere, onFilter, aktiveFiltere, kolonner = 1 }: FiltrerbarHeaderProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLTableHeaderCellElement>(null);
    const onClick = () => setOpen(o => !o);

    useOnInteractOutside({ ref, onInteractOutside: () => setOpen(false), active: open });

    const alleFiltereErAktive = filtere.every(filter => aktiveFiltere.includes(filter));

    return (
        <th scope="col" ref={ref} colSpan={kolonner}>
            <button className={classNames(styles.filterHeader, open && styles.open)} onClick={onClick} tabIndex={0}>
                {children}
            </button>
            {open && (
                <ul className={styles.filterList}>
                    <FilterMenuItem
                        onFilter={() => (alleFiltereErAktive ? onFilter([]) : onFilter(filtere))}
                        aktiv={alleFiltereErAktive}
                    >
                        {alleFiltereErAktive ? 'Opphev alle' : 'Velg alle'}
                    </FilterMenuItem>
                    <hr />
                    {filtere.map((filter, i) => (
                        <FilterMenuItem
                            key={filter.label as string}
                            onFilter={() => onFilter(filter)}
                            aktiv={aktiveFiltere.includes(filter)}
                        >
                            {filter.label}
                        </FilterMenuItem>
                    ))}
                </ul>
            )}
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
                        aktiveFiltere={filtrering?.filtere ?? []}
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
