import React from 'react';
import Tidslinje from '../packages/tidslinje';
import { SammensattTidslinje, VedtaksperiodeStatus } from '../packages/tidslinje/types';

export default {
    title: 'Tidslinje',
    component: Tidslinje
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
                    status: VedtaksperiodeStatus.Venter
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
                    status: VedtaksperiodeStatus.Avslag
                },
                {
                    id: '4567',
                    fom: '2019-09-16',
                    tom: '2019-10-30',
                    status: VedtaksperiodeStatus.TilUtbetaling
                },
                {
                    id: '5678',
                    fom: '2019-07-16',
                    tom: '2019-08-30',
                    status: VedtaksperiodeStatus.Utbetalt
                }
            ]
        }
    ]
};

export const tidslinje = () => {
    return <Tidslinje tidslinjer={mockdata.tidslinjer} onSelect={value => console.log(value)} />;
};
