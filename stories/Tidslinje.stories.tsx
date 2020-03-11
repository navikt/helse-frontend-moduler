import React from 'react';
import Tidslinje, { VedtaksperiodeStatus } from '../packages/tidslinje';
import { SammensattTidslinje } from '../packages/tidslinje/types';
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
                    id: '1234',
                    fom: '2020-01-01',
                    tom: '2020-01-15',
                    status: VedtaksperiodeStatus.IngenUtbetaling
                },
                {
                    id: '2345',
                    fom: '2020-01-16',
                    tom: '2020-01-30',
                    status: VedtaksperiodeStatus.Oppgaver
                },
                {
                    id: '3456',
                    fom: '2019-12-01',
                    tom: '2019-12-31',
                    status: VedtaksperiodeStatus.TilUtbetaling
                },
                {
                    id: '4567',
                    fom: '2019-09-16',
                    tom: '2019-10-31',
                    status: 'ukjent'
                },
                {
                    id: '5678',
                    fom: '2019-07-16',
                    tom: '2019-08-30',
                    status: VedtaksperiodeStatus.Avslag
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
                    status: VedtaksperiodeStatus.Avslag
                }
            ]
        }
    ]
};

export const tidslinje = () => {
    return (
        <Tidslinje
            tidslinjer={mockdata.tidslinjer.slice(0, 1)}
            onSelect={value => console.log(value)}
        />
    );
};

export const flereArbeidsgivere = () => {
    return <Tidslinje tidslinjer={mockdata.tidslinjer} onSelect={value => console.log(value)} />;
};
