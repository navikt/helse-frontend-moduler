import React, { useState } from 'react';
import { Dag, Dagtype, Utbetalingstabell } from '../../packages/tabell/periodetabell';
import { Dagstatus, Kilde } from '../../packages/tabell/periodetabell/types';
import { object, withKnobs } from '@storybook/addon-knobs';

export default {
    component: Utbetalingstabell,
    title: 'Tabeller/Utbetalingstabell',
    decorators: [withKnobs]
};

const dager: Dag[] = [
    {
        type: Dagtype.Egenmelding,
        dato: '19.02.2019',
        gradering: 100,
        kilde: { label: 'IM' },
        utbetaling: 1234
    },
    {
        type: Dagtype.Syk,
        dato: '20.02.2019',
        gradering: 100,
        kilde: { label: 'SM' },
        utbetaling: 1234
    },
    {
        type: Dagtype.Syk,
        dato: '21.02.2019',
        gradering: 100,
        kilde: { label: 'SM' },
        utbetaling: 1234
    },
    {
        type: Dagtype.Syk,
        dato: '22.02.2019',
        gradering: 100,
        kilde: { label: 'SM' },
        utbetaling: 1234
    },
    { type: Dagtype.Helg, dato: '23.02.2019' },
    { type: Dagtype.Helg, dato: '24.02.2019' },
    {
        type: Dagtype.Syk,
        dato: '25.02.2019',
        gradering: 100,
        kilde: { label: 'SM' },
        utbetaling: 1234
    },
    {
        type: Dagtype.Syk,
        dato: '26.02.2019',
        gradering: 100,
        kilde: { label: 'SM' },
        utbetaling: 1234
    },
    { type: Dagtype.Ferie, dato: '27.02.2019', gradering: 100, kilde: { label: 'IM' } },
    { type: Dagtype.Ferie, dato: '28.02.2019', gradering: 100, kilde: { label: 'IM' } }
];

const dagerMedKildelenker = dager.map(dag => ({
    ...dag,
    kilde: dag.type !== Dagtype.Helg ? ({ ...dag.kilde, link: '#' } as Kilde) : undefined
}));

const dagerMedAktiveOppgaver = [
    ...dagerMedKildelenker.slice(0, 6),
    { ...dagerMedKildelenker[6], status: Dagstatus.Advarsel },
    { ...dagerMedKildelenker[7], status: Dagstatus.Advarsel },
    ...dagerMedKildelenker.slice(8)
];

const dagerMedLøsteOppgaver = [
    ...dagerMedKildelenker.slice(0, 6),
    { ...dagerMedKildelenker[6], status: Dagstatus.Suksess },
    { ...dagerMedKildelenker[7], status: Dagstatus.Suksess },
    ...dagerMedKildelenker.slice(8)
];

const dagerSomOverskriderMaksdato = [
    ...dagerMedKildelenker.slice(0, 6),
    { ...dagerMedKildelenker[6], status: Dagstatus.Feil, feilmelding: 'Siste utbetalingsdag' },
    ...dagerMedKildelenker.slice(7).map(dag => ({
        ...dag,
        status: Dagstatus.Inaktiv,
        utbetaling: 'Ingen utbetaling'
    }))
];

export const enkelUtbetalingstabell = () => {
    return <Utbetalingstabell dager={object('Dager', dager)} />;
};

export const medAktiveKildelenker = () => {
    return <Utbetalingstabell dager={dagerMedKildelenker} />;
};

export const medAktiveOppgaver = () => {
    return <Utbetalingstabell dager={dagerMedAktiveOppgaver} />;
};

export const medLøsteOppgaver = () => {
    return <Utbetalingstabell dager={dagerMedLøsteOppgaver} />;
};

export const medDagerSomOverskriderMaksdato = () => {
    return <Utbetalingstabell dager={dagerSomOverskriderMaksdato} />;
};

export const medManuellOverstyring = () => {
    const initialDager: Dag[] = [
        {
            type: Dagtype.Egenmelding,
            dato: '19.02.2019',
            gradering: 100,
            kilde: { label: 'IM', link: '#' },
            utbetaling: 1234
        },
        {
            type: Dagtype.Syk,
            dato: '20.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234
        },
        {
            type: Dagtype.Syk,
            dato: '21.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234
        },
        {
            type: Dagtype.Syk,
            dato: '22.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234
        },
        { type: Dagtype.Helg, dato: '23.02.2019' },
        { type: Dagtype.Helg, dato: '24.02.2019' },
        {
            type: Dagtype.Syk,
            dato: '25.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234
        },
        {
            type: Dagtype.Syk,
            dato: '26.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234
        },
        {
            type: Dagtype.Ferie,
            dato: '27.02.2019',
            gradering: 100,
            kilde: { label: 'IM', link: '#' }
        },
        {
            type: Dagtype.Ferie,
            dato: '28.02.2019',
            gradering: 100,
            kilde: { label: 'IM', link: '#' }
        }
    ];

    const [dager, setDager] = useState(initialDager);

    return <Utbetalingstabell dager={dager} setDager={setDager} />;
};
