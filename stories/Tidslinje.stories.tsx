import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Periode, PeriodeStatus } from '../packages/tidslinje';
import Tidslinje from '../packages/tidslinje/components/tidslinje/Tidslinje';

export default {
    title: 'Tidslinje/Tidslinje',
    component: Tidslinje,
    decorators: [withA11y]
};

const rader = [
    {
        perioder: [
            {
                fom: new Date('2019-11-05'),
                tom: new Date('2019-11-26'),
                status: PeriodeStatus.Inaktiv,
                disabled: true
            },
            {
                fom: new Date('2019-10-18'),
                tom: new Date('2019-11-04'),
                status: PeriodeStatus.Advarsel
            },
            {
                fom: new Date('2019-10-02'),
                tom: new Date('2019-10-17'),
                status: PeriodeStatus.Suksess
            },
            {
                fom: new Date('2019-06-01'),
                tom: new Date('2019-06-25'),
                status: PeriodeStatus.Suksess
            },
            {
                fom: new Date('2019-05-05'),
                tom: new Date('2019-05-30'),
                status: PeriodeStatus.Suksess
            }
        ]
    },
    {
        perioder: [
            {
                fom: new Date('2019-02-10'),
                tom: new Date('2019-02-25'),
                status: PeriodeStatus.Suksess
            },
            {
                fom: new Date('2019-02-26'),
                tom: new Date('2019-03-15'),
                status: PeriodeStatus.Suksess
            }
        ]
    },
    {
        perioder: [
            {
                fom: new Date('2019-10-18'),
                tom: new Date('2019-11-04'),
                status: PeriodeStatus.Advarsel
            },
            {
                fom: new Date('2019-10-02'),
                tom: new Date('2019-10-17'),
                status: PeriodeStatus.Suksess
            },
            {
                fom: new Date('2019-04-02'),
                tom: new Date('2019-04-17'),
                status: PeriodeStatus.Feil
            }
        ]
    }
];

export const tidslinje = () => {
    const startDato = new Date('2019-02-01');
    const sluttDato = new Date('2020-01-01');
    const onSelectPeriode = (periode: Periode) => console.log(periode.status, periode.fom, periode.tom);
    return <Tidslinje rader={rader} startDato={startDato} sluttDato={sluttDato} onSelectPeriode={onSelectPeriode} />;
};
