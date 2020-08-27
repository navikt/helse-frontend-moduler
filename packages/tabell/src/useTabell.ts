import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { FiltrerbarTabellHeader, SorterbarTabellHeader, TabellHeader } from './Head';
import { tilTabellHeader } from './map';
import { endreSorteringsretning, Sortering, tilRetningsstyrtSortering, tilSorterteRader } from './sortering';
import { Filter, Filtrering } from './filtrering';
import { Paginering, paginerteRader } from './paginering';

export interface UseTabellOptions {
    /**
     * Radene som skal vises i tabellen.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere. Kan enten være råverdier (ReactNode) eller objekter som beskriver hvordan kolonnen
     * skal kunne filtreres, sorteres, m.m. (TabellHeader).
     */
    headere?: (ReactNode | TabellHeader)[];
    /**
     * Funksjon som tar råverdiene i tabellen og omformer de til det vi ønsker å rendre på skjerm.
     */
    renderer?: (rad: ReactNode[]) => ReactNode[];
    /**
     * Beskriver hvordan tabellen skal sorteres ved mount.
     */
    defaultSortering?: Sortering;
    /**
     * Beskriver hvordan tabellen skal filtreres ved mount.
     */
    defaultFiltrering?: Filtrering;
    /**
     * Beskriver hvordan tabellen skal pagineres ved mount.
     */
    defaultPaginering?: Paginering;
}

export interface UseTabellPaginering extends Paginering {
    /**
     * Antall sider i pagineringen.
     */
    antallSider: number;
    /**
     * Ordenstallet for det første synlige elementet av alle elementer.
     */
    førsteSynligeElement: number;
    /**
     * Ordenstallet for det siste synlige elementet av alle elementer.
     */
    sisteSynligeElement: number;
    /**
     * Oppdaterer paginering.
     */
    set: Dispatch<SetStateAction<Paginering>>;
}

export interface UseTabell {
    /**
     * Radene som skal vises i tabellen. Ferdig sorterte og filtrerte.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere. Kan enten være råverdier (ReactNode) eller objekter som beskriver hvordan kolonnen
     * skal kunne filtreres, sorteres, m.m. (TabellHeader).
     */
    headere?: TabellHeader[];
    /**
     * Beskriver hvordan tabellen er sortert for øyeblikket.
     */
    sortering: Sortering;
    /**
     * Beskriver hvordan tabellen er filtrert for øyeblikket.
     */
    filtrering: Filtrering;
    /**
     * Beskriver hvordan tabellen er paginert for øyeblikket. Er kun satt dersom `defaultPaginering`-parametret til
     * hooken er satt.
     */
    paginering?: UseTabellPaginering;
}

const _defaultSortering: Sortering = { direction: 'none', kolonne: undefined, func: (_a, _b) => -1 };

const _defaultFiltrering: Filtrering = { filtere: [], kolonne: undefined };

const finnFørsteSynligeElement = (paginering: Paginering) =>
    (paginering.sidenummer - 1) * paginering.antallRaderPerSide + 1;

const finnSisteSynligeElement = (rader: ReactNode[][], paginering: Paginering) => {
    const førsteSynligeElement = finnFørsteSynligeElement(paginering) as number;
    const elementPlassering = førsteSynligeElement + paginering.antallRaderPerSide - 1;
    return elementPlassering > rader.length ? rader.length : elementPlassering;
};

export const useTabell = ({
    rader,
    renderer,
    headere,
    defaultFiltrering,
    defaultSortering,
    defaultPaginering
}: UseTabellOptions): UseTabell => {
    const [sortering, setSortering] = useState<Sortering>(defaultSortering ?? _defaultSortering);
    const [filtrering, setFiltrering] = useState<Filtrering>(defaultFiltrering ?? _defaultFiltrering);
    const [paginering, setPaginering] = useState<Paginering | undefined>(defaultPaginering);

    const toSortOnClick = (func: (a: ReactNode, b: ReactNode) => number, kolonne: number) => () => {
        const sorterPåNyKolonne = sortering.kolonne !== kolonne;
        if (sorterPåNyKolonne) {
            setSortering({
                direction: endreSorteringsretning(_defaultSortering.direction),
                kolonne,
                func
            });
        } else {
            setSortering({ direction: endreSorteringsretning(sortering.direction), kolonne, func });
        }
    };

    const settNyeFiltere = (nyeFiltere: Filter[], kolonne: number) => {
        const filtrerPåNyKolonne = filtrering.kolonne !== kolonne;
        if (filtrerPåNyKolonne) {
            setFiltrering({ filtere: nyeFiltere, kolonne });
        } else {
            setFiltrering(forrige => ({
                ...forrige,
                filtere: nyeFiltere
            }));
        }
    };

    const toggleNyttFilter = (nyttFilter: Filter, kolonne: number) => {
        const filtrerPåNyKolonne = filtrering.kolonne !== kolonne;
        if (filtrerPåNyKolonne) {
            setFiltrering({ filtere: [nyttFilter], kolonne });
        } else if (filtrering.filtere.find(filter => filter.label === nyttFilter.label)) {
            setFiltrering(forrigeFiltere => ({
                ...forrigeFiltere,
                filtere: [...forrigeFiltere.filtere.filter(filteret => filteret.label !== nyttFilter.label)]
            }));
        } else {
            setFiltrering({
                ...filtrering,
                filtere: [...filtrering.filtere, nyttFilter]
            });
        }
    };

    const toFilterOnClick = (etEllerFlereFiltere: Filter | Filter[], kolonne: number) => () => {
        if (Array.isArray(etEllerFlereFiltere)) {
            settNyeFiltere(etEllerFlereFiltere, kolonne);
        } else {
            toggleNyttFilter(etEllerFlereFiltere, kolonne);
        }
    };

    const tilSorterbarHeader = (header: SorterbarTabellHeader, kolonne: number) => ({
        render: header.render,
        onClick: header.sortFunction && toSortOnClick(header.sortFunction, kolonne)
    });

    const tilFiltrerbarHeader = (header: FiltrerbarTabellHeader, kolonne: number) => ({
        render: header.render,
        filtere: header.filtere,
        onClick: header.filtere && ((filter: Filter | Filter[]) => toFilterOnClick(filter, kolonne)())
    });

    const applyFiltrering = (rader: ReactNode[][]) =>
        filtrering.kolonne !== undefined && filtrering.filtere.length > 0
            ? rader.filter(rad => filtrering.filtere.find(filter => filter.func(rad[filtrering.kolonne as number])))
            : rader;

    const applySort = (rader: ReactNode[][]) => {
        const ingentingSkalSorteres = sortering.direction === 'none' || sortering.kolonne === undefined;
        if (ingentingSkalSorteres) {
            return rader;
        } else {
            const retningsstyrtSortering = tilRetningsstyrtSortering(sortering.func, sortering.direction);
            return tilSorterteRader(rader, sortering.kolonne as number, retningsstyrtSortering);
        }
    };

    const constructPaginering = () =>
        paginering && {
            ...paginering,
            antallSider: Math.ceil(rader.length / paginering.antallRaderPerSide),
            førsteSynligeElement: finnFørsteSynligeElement(paginering),
            sisteSynligeElement: finnSisteSynligeElement(rader, paginering),
            set: setPaginering
        };

    return {
        rader: renderer ? applySort(applyFiltrering(rader)).map(renderer) : rader,
        headere: headere?.map((header: TabellHeader, kolonne: number) =>
            header.render
                ? (header as SorterbarTabellHeader).sortFunction
                    ? tilSorterbarHeader(header as SorterbarTabellHeader, kolonne)
                    : (header as FiltrerbarTabellHeader).filtere
                    ? tilFiltrerbarHeader(header as FiltrerbarTabellHeader, kolonne)
                    : header
                : tilTabellHeader(header)
        ),
        sortering,
        filtrering,
        paginering: constructPaginering()
    };
};
