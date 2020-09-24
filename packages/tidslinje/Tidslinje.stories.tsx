import React from 'react';
import { Sykepengetidslinje, Tidslinje, TidslinjeProps, Vedtaksperiodetilstand } from './src';
import { SykepengetidslinjeProps } from './src/components/sykepengetidslinje/Sykepengetidslinje';

export default {
    title: 'Tidslinje',
    component: Tidslinje,
    subcomponents: { Sykepengetidslinje },
    argTypes: {
        rader: {
            defaultValue: [
                [
                    { fom: new Date('2020-01-01'), tom: new Date('2020-01-31'), status: 'suksess' },
                    { fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'suksess' },
                    { fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'suksess' },
                    { fom: new Date('2020-07-01'), tom: new Date('2020-07-31'), status: 'suksess' },
                    { fom: new Date('2020-08-01'), tom: new Date('2020-08-31'), status: 'advarsel' }
                ],
                [
                    { fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'inaktiv' },
                    { fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'inaktiv' }
                ]
            ]
        },
        aktivPeriode: {
            defaultValue: {
                fom: new Date('2020-02-01'),
                tom: new Date('2020-02-29')
            }
        }
    }
};

export const Basic = (args: TidslinjeProps) => <Tidslinje {...args} />;
Basic.storyName = 'Enkel tidslinje';

export const TidslinjeForSykepenger = (args: SykepengetidslinjeProps) => <Sykepengetidslinje {...args} />;
TidslinjeForSykepenger.storyName = 'Sykepengetidslinje';
TidslinjeForSykepenger.argTypes = {
    rader: {
        defaultValue: [
            [
                {
                    id: '123',
                    fom: new Date('2020-01-01'),
                    tom: new Date('2020-01-31'),
                    status: Vedtaksperiodetilstand.Annullert
                },
                {
                    id: '234',
                    fom: new Date('2020-02-01'),
                    tom: new Date('2020-02-29'),
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: '345',
                    fom: new Date('2020-03-01'),
                    tom: new Date('2020-03-31'),
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: '456',
                    fom: new Date('2020-07-01'),
                    tom: new Date('2020-07-31'),
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: '567',
                    fom: new Date('2020-08-01'),
                    tom: new Date('2020-08-31'),
                    status: Vedtaksperiodetilstand.Oppgaver
                }
            ],
            [
                {
                    id: '678',
                    fom: new Date('2020-02-01'),
                    tom: new Date('2020-02-29'),
                    disabled: true,
                    disabledLabel: 'Dette er en ferieperiode fra Infotrygd',
                    status: Vedtaksperiodetilstand.Infotrygdferie
                },
                {
                    id: '789',
                    fom: new Date('2020-03-01'),
                    tom: new Date('2020-03-31'),
                    disabled: true,
                    disabledLabel: 'Dette er en ferieperiode fra Infotrygd',
                    status: Vedtaksperiodetilstand.Infotrygdferie
                }
            ]
        ]
    }
};
