import { ReactNode } from 'react';

export interface Filter {
    /**
     * Navnet på filteret. Rendres i en liste av alle filtere som kan velges for kolonnen. Må være unik for alle
     * filtere i samme kolonne.
     */
    label: ReactNode;
    /**
     * Funksjon som brukes for å avgjøre hvilke rader som skal sorteres vekk basert på innholdet i kolonnen filteret
     * gjelder for.
     */
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
