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
        { render: 'Dato' },
        {
            render: 'Grad',
            filtere: [
                { label: '< 100%', func: (grad: number) => grad < 100 },
                { label: '< 75%', func: (grad: number) => grad < 75 }
            ]
        },
        {
            render: 'Utbetaling',
            filtere: [
                { label: '< 1000kr', func: (utbetaling: number) => utbetaling < 1000 },
                { label: '< 800kr', func: (utbetaling: number) => utbetaling < 800 }
            ]
        }
    ];

    const rader = [
        ['19.02.2019', 100, 1234],
        ['20.02.2019', 100, 1234],
        ['21.02.2019', 50, 617],
        ['22.02.2019', 50, 617],
        ['23.02.2019', 80, 987],
        ['24.02.2019', 80, 987]
    ];

    const renderer = (rad: ReactNode[]) => [rad[0], `${rad[1]}%`, `${rad[2]} kr`];

    const tabell = useTabell({ rader, headere, renderer });

    return <Tabell beskrivelse="En tabell med flere filtere" {...tabell} />;
};
