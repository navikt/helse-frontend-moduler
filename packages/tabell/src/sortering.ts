import { ReactNode } from 'react';

export interface Sortering {
    /**
     * Funksjonen som sorterer radene.
     */
    func: (a: ReactNode, b: ReactNode) => number;
    /**
     * Retningen det sorteres i.
     */
    direction: 'ascending' | 'descending' | 'none';
    /**
     * Kolonneindeksen det sorteres på.
     */
    kolonne?: number;
}

export const endreSorteringsretning = (
    direction: 'ascending' | 'descending' | 'none'
): 'ascending' | 'descending' | 'none' =>
    direction === 'ascending' ? 'descending' : direction === 'descending' ? 'none' : 'ascending';

export const tilRetningsstyrtSortering = (
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

export const tilSorterteRader = (
    rader: ReactNode[][],
    kolonne: number,
    sortFunction: (a: ReactNode, b: ReactNode) => number
) => [...rader].sort((a: ReactNode[], b: ReactNode[]) => sortFunction(a[kolonne], b[kolonne]));
