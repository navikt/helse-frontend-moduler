import { Hendelse, Hendelsetype } from '../../packages/logg/src';
import React from 'react';
import { Filter } from '../../packages/logg/src/types';
import { IkonHistorikk } from '../../packages/logg/src/icons/IkonHistorikk';
import { IkonDokumenter } from '../../packages/logg/src/icons/IkonDokumenter';
import { IkonMeldinger } from '../../packages/logg/src/icons/IkonMeldinger';

export const ExampleHendelse = (props: Hendelse) => null;

export const ExampleFilter = (props: Filter) => null;

export const filtere: Filter[] = [
    {
        filterFunction: (_: Hendelse) => true,
        renderProp: <IkonHistorikk />
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.type === Hendelsetype.Dokumenter,
        renderProp: <IkonDokumenter />
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.type === Hendelsetype.Meldinger,
        renderProp: <IkonMeldinger />
    }
];

export const hendelser: Hendelse[] = [
    {
        navn: 'Faresignaler oppdaget',
        dato: '17.05.2019',
        type: Hendelsetype.Meldinger,
        status: 'advarsel',
        beskrivelse: (
            <ul className="liste">
                <li>Har hatt andre inntekter</li>
                <li>Store avvik inntekt</li>
                <li>Få tungtveiende vurderinger</li>
            </ul>
        )
    },
    {
        navn: 'Manuelt behandlet',
        dato: '17.05.2019',
        type: Hendelsetype.Historikk,
        beskrivelse: 'Hanne Jansen'
    },
    {
        navn: 'Søknad mottatt',
        dato: '17.05.2019',
        type: Hendelsetype.Dokumenter
    },
    {
        navn: 'Inntektsmelding mottatt',
        dato: '17.05.2019',
        type: Hendelsetype.Dokumenter
    },
    {
        navn: 'Sykmelding mottatt',
        dato: '09.05.2019',
        type: Hendelsetype.Dokumenter
    }
];

export const statusHendelser: Hendelse[] = [
    {
        navn: '🚨',
        dato: '04.01.2020',
        status: 'feil'
    },
    {
        navn: '🧀',
        dato: '03.01.2020',
        status: 'advarsel'
    },
    {
        navn: '✅',
        dato: '02.01.2020',
        status: 'suksess'
    },
    {
        navn: '🥶',
        dato: '01.01.2020',
        status: 'info'
    }
];

export const statusFiltere: Filter[] = [
    {
        filterFunction: (_: Hendelse) => true,
        renderProp: <span className="filterknapp">🌈</span>
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.status === 'feil',
        renderProp: <span className="filterknapp">🚨</span>
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.status === 'advarsel',
        renderProp: <span className="filterknapp">🧀</span>
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.status === 'suksess',
        renderProp: <span className="filterknapp">✅</span>
    },
    {
        filterFunction: (hendelse: Hendelse) => hendelse.status === 'info',
        renderProp: <span className="filterknapp">🥶</span>
    },
];