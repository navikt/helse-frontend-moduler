import React from 'react';
import { Tabell, Tabellrad, useTabell, TabellProps } from './src';
import { SorterbarTabellHeader, TabellHeader } from './src/Head';
import dayjs from 'dayjs';

export default {
    title: 'Tabell',
    component: Tabell,
    argTypes: {
        beskrivelse: {
            defaultValue: 'En tabell'
        },
        headere: {
            defaultValue: ['Dato', 'Grad', 'Utbetaling']
        },
        rader: {
            defaultValue: [
                ['19.02.2019', '100%', '1234 kr'],
                ['20.02.2019', '100%', '1234 kr'],
                ['21.02.2019', '50%', '617 kr'],
                ['22.02.2019', '50%', '617 kr'],
                ['23.02.2019', '80%', '987 kr'],
                ['24.02.2019', '80%', '987 kr']
            ]
        }
    }
};

export const Basic = (args: TabellProps) => <Tabell {...args} />;
Basic.storyName = 'Tabell';

export const MedSortering = () => {
    const headere: (TabellHeader | SorterbarTabellHeader)[] = [
        {
            render: 'Dato',
            sortFunction: (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
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

    const rader: Tabellrad[] = [
        { celler: ['2019-02-19', 100, 1234], id: '1' },
        { celler: ['2019-02-20', 100, 1234], id: '2' },
        { celler: ['2019-02-21', 50, 617], id: '3' },
        { celler: ['2019-02-22', 50, 617], id: '4' },
        { celler: ['2019-02-23', 80, 987], id: '5' },
        { celler: ['2019-02-24', 80, 987], id: '6' }
    ];

    const renderer = (rad: Tabellrad) => ({
        ...rad,
        celler: [dayjs(rad.celler[0] as string).format('DD.MM.YYYY'), `${rad.celler[1]}%`, `${rad.celler[2]} kr`]
    });

    const tabell = useTabell({ rader, headere, renderer });

    return <Tabell beskrivelse="En tabell med flere filtere" {...tabell} />;
};

export const MedFiltere = () => {
    const headere = [
        { render: 'Name' },
        {
            render: 'Type',
            filtere: [
                { label: 'Electric', func: (type: string) => type === '⚡️' },
                { label: 'Fire', func: (type: string) => type === '🔥' },
                { label: 'Water', func: (type: string) => type === '💦' },
                { label: 'Grass', func: (type: string) => type === '🥬' },
                { label: 'Ghost', func: (type: string) => type === '👻' },
                { label: 'Dragon', func: (type: string) => type === '🐉' }
            ]
        },
        {
            render: 'Evolution',
            filtere: [
                { label: 1, func: (evolution: number) => evolution === 1 },
                { label: 2, func: (evolution: number) => evolution === 2 },
                { label: 3, func: (evolution: number) => evolution === 3 }
            ]
        }
    ];

    const rader = [
        { celler: ['Pikachu', '⚡️', 1], id: '1' },
        { celler: ['Charmander', '🔥', 1], id: '2' },
        { celler: ['Squirtle', '💦', 1], id: '3' },
        { celler: ['Bulbasaur', '🥬', 1], id: '4' },
        { celler: ['Haunter', '👻', 2], id: '5' },
        { celler: ['Dragonite', '🐉', 3], id: '6' }
    ];

    const tabell = useTabell({ rader, headere });

    return <Tabell beskrivelse="En tabell med flere filtere" {...tabell} />;
};
