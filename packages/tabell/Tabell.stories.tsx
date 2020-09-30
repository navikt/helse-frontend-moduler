import React, { ReactNode } from 'react';
import { Tabell, useTabell } from './src';
import { TabellProps } from './src/Tabell';
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

    const rader = [
        ['2019-02-19', 100, 1234],
        ['2019-02-20', 100, 1234],
        ['2019-02-21', 50, 617],
        ['2019-02-22', 50, 617],
        ['2019-02-23', 80, 987],
        ['2019-02-24', 80, 987]
    ];

    const renderer = (rad: ReactNode[]) => [dayjs(rad[0] as string).format('DD.MM.YYYY'), `${rad[1]}%`, `${rad[2]} kr`];

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
        ['Pikachu', '⚡️', 1],
        ['Charmander', '🔥', 1],
        ['Squirtle', '💦', 1],
        ['Bulbasaur', '🥬', 1],
        ['Haunter', '👻', 2],
        ['Dragonite', '🐉', 3]
    ];

    const tabell = useTabell({ rader, headere });

    return <Tabell beskrivelse="En tabell med flere filtere" {...tabell} />;
};
