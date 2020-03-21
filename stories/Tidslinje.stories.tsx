import React from 'react';
import Tidslinje from '../packages/tidslinje';
import { Inntektstype, SammensattTidslinje, Vedtaksperiodetilstand } from '../packages/tidslinje/types';
import { withA11y } from '@storybook/addon-a11y';

export default {
    title: 'Tidslinje',
    component: Tidslinje,
    decorators: [withA11y]
};

const mockdata: SammensattTidslinje = {
    tidslinjer: [
        {
            id: '1234567890',
            inntektsnavn: 'Sykepleiehuset AS',
            inntektstype: 'arbeidsgiver',
            vedtaksperioder: [
                {
                    id: '2345',
                    fom: '2020-01-16',
                    tom: '2020-01-30',
                    status: Vedtaksperiodetilstand.Venter,
                    disabled: true
                },
                {
                    id: '1234',
                    fom: '2020-01-01',
                    tom: '2020-01-15',
                    status: Vedtaksperiodetilstand.Oppgaver
                },
                {
                    id: '3456',
                    fom: '2019-12-01',
                    tom: '2019-12-31',
                    status: Vedtaksperiodetilstand.IngenUtbetaling,
                    disabled: true
                },
                {
                    id: '4567',
                    fom: '2019-09-16',
                    tom: '2019-10-31',
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: '5678',
                    fom: '2019-07-16',
                    tom: '2019-08-30',
                    status: Vedtaksperiodetilstand.Avslag
                }
            ]
        },

        {
            id: '1234567891',
            inntektsnavn: 'Oslo Kommune',
            inntektstype: 'arbeidsgiver',
            vedtaksperioder: [
                {
                    id: '34561',
                    fom: '2019-11-01',
                    tom: '2019-11-30',
                    status: Vedtaksperiodetilstand.Avslag
                }
            ]
        }
    ]
};

export const tidslinje = () => {
    return <Tidslinje tidslinjer={mockdata.tidslinjer.slice(0, 1)} onSelect={value => console.log(value)} />;
};

export const tidslinjeMedMangeVedtaksperioder = () => {
    const tidslinje = mockdata.tidslinjer.slice(0, 1)[0];
    const oppdaterteVedtaksperioder = [
        ...tidslinje.vedtaksperioder,
        {
            id: '6567',
            fom: '2019-07-01',
            tom: '2019-07-15',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '7567',
            fom: '2019-06-01',
            tom: '2019-06-30',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '8567',
            fom: '2019-05-01',
            tom: '2019-05-31',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '9567',
            fom: '2019-04-01',
            tom: '2019-04-30',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '1667',
            fom: '2019-03-01',
            tom: '2019-03-31',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '2667',
            fom: '2019-02-01',
            tom: '2019-02-28',
            status: Vedtaksperiodetilstand.Utbetalt
        },
        {
            id: '3667',
            fom: '2019-01-01',
            tom: '2010-01-31',
            status: Vedtaksperiodetilstand.Utbetalt
        }
    ];
    const mockdataMedMangeTidslinjer = [
        {
            ...tidslinje,
            vedtaksperioder: oppdaterteVedtaksperioder
        }
    ];
    return <Tidslinje tidslinjer={mockdataMedMangeTidslinjer} onSelect={value => console.log(value)} />;
};

export const medInaktivPeriode = () => {
    const tidslinjer = [
        {
            id: '1234567890',
            inntektsnavn: 'Sykepleiehuset AS',
            inntektstype: 'arbeidsgiver' as Inntektstype,
            vedtaksperioder: [
                {
                    id: '2345',
                    fom: '2020-01-16',
                    tom: '2020-01-30',
                    status: Vedtaksperiodetilstand.Venter,
                    disabled: true
                },
                {
                    id: '1234',
                    fom: '2020-01-01',
                    tom: '2020-01-15',
                    status: Vedtaksperiodetilstand.Oppgaver
                },
                {
                    id: '3456',
                    fom: '2019-12-01',
                    tom: '2019-12-31',
                    status: Vedtaksperiodetilstand.IngenUtbetaling,
                    disabled: true
                },
                {
                    id: '4567',
                    fom: '2019-09-16',
                    tom: '2019-10-31',
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: '5678',
                    fom: '2019-07-16',
                    tom: '2019-08-30',
                    status: Vedtaksperiodetilstand.Avslag
                },
                {
                    id: '56782',
                    fom: '2018-07-16',
                    tom: '2018-08-30',
                    status: Vedtaksperiodetilstand.Avslag
                }
            ]
        }
    ];

    return <Tidslinje tidslinjer={tidslinjer} onSelect={value => console.log(value)} />;
};

export const flereArbeidsgivere = () => {
    return <Tidslinje tidslinjer={mockdata.tidslinjer} onSelect={value => console.log(value)} />;
};
