import { ReactNode } from 'react';

export interface Filter {
    label: ReactNode;
    func: (value: ReactNode) => boolean;
}

export interface Filtrering {
    /**
     * Aktive filtere som brukes til å filtrere rader i tabellen.
     */
    filtere: Filter[];
    /**
     * Kolonnen det filtreres på. Kan kun filtreres på én om gangen.
     */
    kolonne?: number;
}
