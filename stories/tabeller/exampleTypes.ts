import { ReactNode } from 'react';
import { Filter } from '../../packages/tabell/src/filtrering';

interface Sortering {
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

interface Filtrering {
    /**
     * Aktive filtere som brukes til å filtrere rader i tabellen.
     */
    filtere: Filter[];
    /**
     * Kolonnen det filtreres på. Kan kun filtreres på én om gangen.
     */
    kolonne?: number;
}

export interface UseTabellOptions {
    /**
     * Radene som skal vises i tabellen.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere. Kan enten være råverdier (ReactNode) eller objekter som beskriver hvordan kolonnen
     * skal kunne filtreres og sorteres (TabellHeader).
     */
    headere?: (ReactNode | TabellHeader)[];
    /**
     * Funksjon som tar råverdiene i tabellen og omformer de til det vi ønsker å rendre på skjerm.
     */
    renderer?: (rad: ReactNode[]) => ReactNode[];
}

export interface UseTabell {
    /**
     * Radene som skal vises i tabellen. Ferdig sorterte og filtrerte.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere som beskriver hvordan kolonnen skal kunne filtreres og sorteres.
     */
    headere?: TabellHeader[];
    /**
     * Beskriver hvordan tabellen er sortert for øyeblikket.
     */
    sortering: Sortering;
}

interface TabellHeader {
    /**
     * Det som skal rendres i `th`-elementet.
     */
    render: ReactNode;
    /**
     * Beskriver hvordan radene skal sorteres basert på innholdet i kolonnen.
     */
    sortFunction?: (a: ReactNode, b: ReactNode) => number;
    /**
     * Funksjon som kalles når bruker klikker på headeren.
     */
    onClick?: () => void;
}

export const EnSorterbarHeader = (props: TabellHeader) => null;

export const EnUseTabellOptions = (props: UseTabellOptions) => null;

export const EnUseTabell = (props: UseTabell) => null;

export const EnSortering = (props: Sortering) => null;

export const EnFiltrering = (props: Filtrering) => null;