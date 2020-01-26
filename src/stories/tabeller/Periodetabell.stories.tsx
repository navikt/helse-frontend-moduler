import React from 'react';
import Periodetabell, { Dag, Dagtype } from '../../components/Periodetabell';

export default { title: 'Tabeller/Periodetabell' };

export const enkelPeriodetabell = () => {
    const dager: Dag[] = [
        { type: Dagtype.Egenmelding, dato: '19.02.2019', gradering: 100, kilde: { label: 'IM' } },
        { type: Dagtype.Syk, dato: '20.02.2019', gradering: 100, kilde: { label: 'SM' } },
        { type: Dagtype.Syk, dato: '21.02.2019', gradering: 100, kilde: { label: 'SM' } },
        { type: Dagtype.Syk, dato: '22.02.2019', gradering: 100, kilde: { label: 'SM' } },
        { type: Dagtype.Helg, dato: '23.02.2019' },
        { type: Dagtype.Helg, dato: '24.02.2019' },
        { type: Dagtype.Syk, dato: '25.02.2019', gradering: 100, kilde: { label: 'SM' } },
        { type: Dagtype.Syk, dato: '26.02.2019', gradering: 100, kilde: { label: 'SM' } },
        { type: Dagtype.Ferie, dato: '27.02.2019', gradering: 100, kilde: { label: 'IM' } },
        { type: Dagtype.Ferie, dato: '28.02.2019', gradering: 100, kilde: { label: 'IM' } },
    ];

    return <Periodetabell dager={dager} />;
};

export const medAktiveKildelenker = () => {
    const dager: Dag[] = [
        { type: Dagtype.Egenmelding, dato: '19.02.2019', gradering: 100, kilde: { label: 'IM', link: '#' } },
        { type: Dagtype.Syk, dato: '20.02.2019', gradering: 100, kilde: { label: 'SM', link: '#' } },
        { type: Dagtype.Syk, dato: '21.02.2019', gradering: 100, kilde: { label: 'SM', link: '#' } },
        { type: Dagtype.Syk, dato: '22.02.2019', gradering: 100, kilde: { label: 'SM', link: '#' } },
        { type: Dagtype.Helg, dato: '23.02.2019' },
        { type: Dagtype.Helg, dato: '24.02.2019' },
        { type: Dagtype.Syk, dato: '25.02.2019', gradering: 100, kilde: { label: 'SM', link: '#' } },
        { type: Dagtype.Syk, dato: '26.02.2019', gradering: 100, kilde: { label: 'SM', link: '#' } },
        { type: Dagtype.Ferie, dato: '27.02.2019', gradering: 100, kilde: { label: 'IM', link: '#' } },
        { type: Dagtype.Ferie, dato: '28.02.2019', gradering: 100, kilde: { label: 'IM', link: '#' } },
    ];

    return <Periodetabell dager={dager} />;
};
