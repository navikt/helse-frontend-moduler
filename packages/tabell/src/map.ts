import { ReactNode } from 'react';
import { TabellHeader } from './Head';
import { Header } from './types';

export const erTabellHeader = (header: ReactNode | Header): boolean => (header as TabellHeader).render !== undefined;

export const tilTabellHeader = (header: ReactNode | Header): Header =>
    (erTabellHeader(header) ? header : { render: header }) as Header;
