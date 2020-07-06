import { ReactNode, useState } from 'react';
import { TabellHeader } from './Head';
import { Sortering } from './Tabell';

export interface UseTabellBaseProperties {
    /**
     * Radene som skal vises i tabellen. Ferdig sorterte og filtrerte.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere. Kan enten være råverdier (ReactNode) eller objekter som beskriver hvordan kolonnen
     * skal kunne filtreres, sorteres, m.m. (TabellHeader).
     */
    headere?: (ReactNode | TabellHeader)[];
}

export interface UseTabellOptions extends UseTabellBaseProperties {
    /**
     * Funksjon som tar råverdiene i tabellen og omformer de til det vi ønsker å rendre på skjerm.
     */
    renderer?: (rad: ReactNode[]) => ReactNode[];
}

export interface UseTabell extends UseTabellBaseProperties {
    /**
     * Beskriver hvordan tabellen er sortert for øyeblikket.
     */
    sortering: Sortering;
}

const toggleDirection = (direction: 'ascending' | 'descending' | 'none') =>
    direction === 'ascending' ? 'descending' : direction === 'descending' ? 'none' : 'ascending';

const toDirectionalSort = (
    sortFunction: (a: ReactNode, b: ReactNode) => number,
    direction: 'ascending' | 'descending' | 'none'
) => {
    switch (direction) {
        case 'ascending':
            return sortFunction;
        case 'descending':
            return (a: ReactNode, b: ReactNode) => sortFunction(b, a);
        case 'none':
            return (_a: ReactNode, _b: ReactNode) => -1;
    }
};

const defaultSortering: Sortering = { direction: 'none', kolonne: undefined };

export const useTabell = ({ rader, renderer, headere }: UseTabellOptions): UseTabell => {
    const [sorterteRader, setSorterteRader] = useState(rader);
    const [sortering, setSortering] = useState<Sortering>(defaultSortering);

    const toSortOnClick = (sortFunction: (a: ReactNode, b: ReactNode) => number, kolonne: number) => () => {
        setSortering(s => {
            const gammelSortering = s.kolonne === kolonne ? s : defaultSortering;
            const nyDirection = toggleDirection(gammelSortering.direction);
            const directionalSort = toDirectionalSort(sortFunction, nyDirection);
            if (nyDirection === 'none') {
                setSorterteRader(rader);
            } else {
                setSorterteRader(rader =>
                    [...rader].sort((a: ReactNode[], b: ReactNode[]) => directionalSort(a[kolonne], b[kolonne]))
                );
            }
            return { direction: nyDirection, kolonne };
        });
    };

    const toSorterbarHeader = (header: TabellHeader, kolonne: number) => ({
        render: header.render,
        onClick: header.sortFunction && toSortOnClick(header.sortFunction, kolonne)
    });

    return {
        rader: renderer ? sorterteRader.map(renderer) : sorterteRader,
        headere: headere?.map((header: TabellHeader, kolonne: number) =>
            header.render ? toSorterbarHeader(header, kolonne) : header
        ),
        sortering
    };
};
