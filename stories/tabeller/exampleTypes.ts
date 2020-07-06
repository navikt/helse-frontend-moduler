import { ReactNode } from 'react';

interface Sortering {
    /**
     * Retningen det sorteres i.
     */
    direction: 'ascending' | 'descending' | 'none'
    /**
     * Kolonneindeksen det sorteres på.
     */
    kolonne?: number;
}

interface UseTabellBaseProperties {
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

interface UseTabellOptions extends UseTabellBaseProperties {
    /**
     * Funksjon som tar råverdiene i tabellen og omformer de til det vi ønsker å rendre på skjerm.
     */
    renderer?: (rad: ReactNode[]) => ReactNode[];
}

interface UseTabell extends UseTabellBaseProperties {
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

