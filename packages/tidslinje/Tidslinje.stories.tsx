import React from 'react';
import { Sykepengetidslinje, Tidslinje, TidslinjeProps } from './src';

export default {
    title: 'Tidslinje/Tidslinje',
    component: Tidslinje,
    subcomponents: { Sykepengetidslinje },
    argTypes: {
        rader: {
            defaultValue: [
                [
                    { id: '123', fom: new Date('2020-01-01'), tom: new Date('2020-01-31'), status: 'suksess' },
                    { id: '234', fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'suksess' },
                    { id: '345', fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'suksess' },
                    { id: '456', fom: new Date('2020-07-01'), tom: new Date('2020-07-31'), status: 'suksess' },
                    { id: '567', fom: new Date('2020-08-01'), tom: new Date('2020-08-31'), status: 'advarsel' }
                ],
                [
                    { id: '678', fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'inaktiv' },
                    { id: '789', fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'inaktiv' }
                ]
            ]
        },
        aktivtUtsnitt: {
            defaultValue: {
                fom: new Date('2020-07-01'),
                tom: new Date('2020-07-31')
            }
        }
    }
};

export const Basic = (args: TidslinjeProps) => <Tidslinje {...args} />;
Basic.storyName = 'Enkel tidslinje';
