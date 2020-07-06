import React, { ReactNode } from 'react';
import { Tabell, useTabell } from '../../packages/tabell/src';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TabellHeader } from '../../packages/tabell/src/Head';

dayjs.extend(customParseFormat);

const tilMillisekunder = (norskDato: string) =>
    dayjs(norskDato, 'DD.MM.YYYY')
        .toDate()
        .getTime();

export const headere = ['Dato', 'Grad', 'Utbetaling'];

export const rader = [
    ['19.02.2019', '100%', '1234 kr'],
    ['20.02.2019', '50%', '617 kr'],
    ['21.02.2019', '50%', '617 kr'],
    ['22.02.2019', '80%', '987 kr']
];

export const sorterbareHeadere: (ReactNode | TabellHeader)[] = [
    {
        render: 'Dato',
        sortFunction: (a: string, b: string) => tilMillisekunder(a) - tilMillisekunder(b)
    },
    {
        render: 'Grad',
        sortFunction: (a: number, b: number) => a - b
    },
    {
        render: 'Utbetaling',
        sortFunction: (a: number, b: number) => a - b
    }
];

export const sorterbareRader = [
    ['19.02.2019', 100, 1234],
    ['20.02.2019', 50, 617],
    ['21.02.2019', 50, 617],
    ['22.02.2019', 80, 987]
];

export const TestTabell = () => {
    const renderer = (rad: ReactNode[]) => [rad[0], `${rad[1]}%`, `${rad[2]} kr`];
    const { rader: tabellrader, headere: tabellheadere, sortering } = useTabell({
        rader: sorterbareRader,
        headere: sorterbareHeadere,
        renderer
    });

    return (
        <Tabell beskrivelse="En sorterbar tabell" rader={tabellrader} headere={tabellheadere} sortering={sortering} />
    );
};