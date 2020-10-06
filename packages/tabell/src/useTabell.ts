import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { FiltrerbarTabellHeader, SorterbarTabellHeader, TabellHeader } from './Head';
import { tilTabellHeader } from './map';
import { endreSorteringsretning, Sortering, tilRetningsstyrtSortering, tilSorterteRader } from './sortering';
import { Filter, Filtrering } from './filtrering';
import { Paginering } from './paginering';

export interface UseTabellOptions {
    /**
     * Radene som skal vises i tabellen.
     */
    rader: ReactNode[][];
    /**
     * Liste av kolonneheadere. Kan enten være råverdier (ReactNode) eller objekter som beskriver hvordan kolonnen
     * skal kunne filtreres, sorteres, m.m. (TabellHeader).
     */
    headere?: (ReactNode | TabellHeader | FiltrerbarTabellHeader)[];
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

export interface UseTabellFiltrering extends Filtrering {
    /**
     * Oppdaterer filtrering.
     */
    set: Dispatch<SetStateAction<Filtrering>>;
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
    filtrering: UseTabellFiltrering;
    /**
     * Beskriver hvordan tabellen er paginert for øyeblikket. Er kun satt dersom `defaultPaginering`-parametret til
     * hooken er satt.
     */
    paginering?: UseTabellPaginering;
}

const _defaultSortering: Sortering = { direction: 'none', kolonne: undefined, func: (_a, _b) => -1 };

const _defaultFiltrering: Filtrering = { filtere: [] };

const initialiserTomFiltrering = (headere?: (ReactNode | TabellHeader | FiltrerbarTabellHeader)[]): Filtrering => {
    if (!headere) return _defaultFiltrering;
    const filtere = headere
        .flatMap((header: FiltrerbarTabellHeader, kolonne: number) =>
            header.filtere ? header.filtere.map(filter => ({ filter, kolonne, active: false })) : null
        )
        .filter(filter => !!filter) as { filter: Filter; kolonne: number; active: boolean }[];
    return { filtere };
};

const finnFørsteSynligeElement = (rader: ReactNode[][], paginering: Paginering) =>
    rader.length > 0 ? (paginering.sidenummer - 1) * paginering.antallRaderPerSide + 1 : 0;

const finnSisteSynligeElement = (rader: ReactNode[][], paginering: Paginering) => {
    const førsteSynligeElement = finnFørsteSynligeElement(rader, paginering) as number;
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
    const [filtrering, setFiltrering] = useState<Filtrering>(defaultFiltrering ?? initialiserTomFiltrering(headere));
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

    const onToggleFilter = (etEllerFlereFiltere: Filter | Filter[], valgtKolonne: number, override?: boolean) => () => {
        if (Array.isArray(etEllerFlereFiltere)) {
            const labels = etEllerFlereFiltere.map(filter => filter.label);
            setFiltrering(filtrering => ({
                filtere: filtrering.filtere.map(({ filter, kolonne, active }) =>
                    kolonne === valgtKolonne && labels.includes(filter.label)
                        ? { filter, kolonne, active: override ? override : !active }
                        : { filter, kolonne, active }
                )
            }));
        } else {
            const etFilter = etEllerFlereFiltere as Filter;
            setFiltrering(filtrering => ({
                filtere: filtrering.filtere.map(({ filter, kolonne, active }) =>
                    kolonne === valgtKolonne && etFilter.label === filter.label
                        ? { filter, kolonne, active: override ? override : !active }
                        : { filter, kolonne, active }
                )
            }));
        }
    };

    const tilSorterbarHeader = (header: SorterbarTabellHeader, kolonne: number) => ({
        render: header.render,
        onClick: header.sortFunction && toSortOnClick(header.sortFunction, kolonne)
    });

    const tilFiltrerbarHeader = (header: FiltrerbarTabellHeader, kolonne: number) => ({
        render: header.render,
        filtere: header.filtere,
        onClick:
            header.filtere &&
            ((filter: Filter | Filter[], override?: boolean) => onToggleFilter(filter, kolonne, override)())
    });

    const applyFiltrering = (rader: ReactNode[][]) => {
        const aktiveFiltere = filtrering.filtere
            .filter(({ active }) => active)
            .reduce(
                (filterePerKolonne, filter) => ({
                    ...filterePerKolonne,
                    [filter.kolonne]: filterePerKolonne[filter.kolonne]
                        ? [...filterePerKolonne[filter.kolonne], filter]
                        : [filter]
                }),
                {}
            );
        const filterePerKolonne = Object.values(aktiveFiltere);
        return Object.keys(aktiveFiltere).length > 0
            ? rader.filter(rad =>
                  filterePerKolonne.every((filtere: { filter: Filter; kolonne: number }[]) =>
                      filtere.some(({ filter, kolonne }) => filter.func(rad[kolonne]))
                  )
              )
            : rader;
    };

    const applySort = (rader: ReactNode[][]) => {
        const ingentingSkalSorteres = sortering.direction === 'none' || sortering.kolonne === undefined;
        if (ingentingSkalSorteres) {
            return rader;
        } else {
            const retningsstyrtSortering = tilRetningsstyrtSortering(sortering.func, sortering.direction);
            return tilSorterteRader(rader, sortering.kolonne as number, retningsstyrtSortering);
        }
    };

    const constructFiltrering = (): UseTabellFiltrering => ({
        ...filtrering,
        set: setFiltrering
    });

    const constructPaginering = (filtrerteRader: ReactNode[][]) =>
        paginering && {
            ...paginering,
            antallSider: Math.ceil(filtrerteRader.length / paginering.antallRaderPerSide),
            førsteSynligeElement: finnFørsteSynligeElement(filtrerteRader, paginering),
            sisteSynligeElement: finnSisteSynligeElement(filtrerteRader, paginering),
            set: setPaginering
        };

    const sorterteRader = applySort(applyFiltrering(rader)).map(renderer ? renderer : rad => rad);
    return {
        rader: sorterteRader,
        headere: headere?.map(
            (header: SorterbarTabellHeader | FiltrerbarTabellHeader | TabellHeader, kolonne: number) =>
                header.render
                    ? header['sortFunction']
                        ? tilSorterbarHeader(header as SorterbarTabellHeader, kolonne)
                        : (header as FiltrerbarTabellHeader).filtere
                        ? tilFiltrerbarHeader(header as FiltrerbarTabellHeader, kolonne)
                        : header
                    : tilTabellHeader(header)
        ),
        sortering,
        filtrering: constructFiltrering(),
        paginering: constructPaginering(sorterteRader)
    };
};
