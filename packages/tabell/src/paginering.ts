import { Tabellrader } from './Tabell';

export type Paginering = {
    antallRaderPerSide: number;
    sidenummer: number;
};

export const paginerteRader = (tabellrader: Tabellrader, paginering?: Paginering) =>
    paginering &&
    (() => {
        const { antallRaderPerSide, sidenummer } = paginering;
        const startIndex = antallRaderPerSide * (sidenummer - 1);
        const endIndex = startIndex + antallRaderPerSide;
        return tabellrader.slice(startIndex, endIndex);
    })();
