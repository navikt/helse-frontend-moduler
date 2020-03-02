import React, { useState } from 'react';
import { Dag, Dagtype, Utbetalingstabell } from '../../packages/tabell/periodetabell';

export default {
    component: Utbetalingstabell,
    title: 'Tabeller/Utbetalingstabell'
};

export const enkelUtbetalingstabell = () => {
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

    return <Utbetalingstabell dager={dager} />;
};

export const medAktiveKildelenker = () => {
    const dager: Dag[] = [
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

    return <Utbetalingstabell dager={dager} />;
};

export const medAktivOppgave = () => {
    const dager: Dag[] = [
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
            type: Dagtype.Ubestemt,
            dato: '25.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234,
            oppgave: 'advarsel'
        },
        {
            type: Dagtype.Ubestemt,
            dato: '26.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234,
            oppgave: 'advarsel'
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

    return <Utbetalingstabell dager={dager} />;
};

export const medFerdigOppgave = () => {
    const dager: Dag[] = [
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
            utbetaling: 1234,
            oppgave: 'løst'
        },
        {
            type: Dagtype.Syk,
            dato: '26.02.2019',
            gradering: 100,
            kilde: { label: 'SM', link: '#' },
            utbetaling: 1234,
            oppgave: 'løst'
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

    return <Utbetalingstabell dager={dager} />;
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
