import { ReactNode } from 'react';
import { TabellHeader } from './Head';
import { Header } from './types';
import { Tabellrad } from './Tabell';

export const erTabellHeader = (header: ReactNode | Header): boolean => (header as TabellHeader).render !== undefined;

export const tilTabellHeader = (header: ReactNode | Header): Header =>
    (erTabellHeader(header) ? header : { render: header }) as Header;

const erTabellrad = (rad: ReactNode[] | Tabellrad): boolean => (rad as Tabellrad).celler !== undefined;

export const tilTabellrad = (rad: ReactNode[] | Tabellrad): Tabellrad =>
    (erTabellrad(rad) ? rad : { celler: rad }) as Tabellrad;
