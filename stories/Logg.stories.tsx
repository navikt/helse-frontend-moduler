import React from 'react';
import Logg from '../packages/logg';
import { Hendelsetype } from '../packages/logg/types';

export default {
    component: Logg,
    title: 'Logg'
};

export const logg = () => {
    const hendelser = [
        {
            id: '123',
            navn: 'Søknad mottatt',
            dato: '17.05.2019',
            type: Hendelsetype.Dokumenter
        },
        {
            id: '234',
            navn: 'Inntektsmelding mottatt',
            dato: '17.05.2019',
            type: Hendelsetype.Dokumenter
        },
        {
            id: '345',
            navn: 'Sykmelding mottatt',
            dato: '09.05.2019',
            type: Hendelsetype.Dokumenter
        }
    ];
    return <Logg hendelser={hendelser} />;
};

export const medHistorikk = () => {
    const hendelser = [
        {
            id: '012',
            navn: 'Manuelt behandlet',
            dato: '17.05.2019',
            type: Hendelsetype.Historikk,
            beskrivelse: 'Hanne Jansen'
        },
        {
            id: '123',
            navn: 'Søknad mottatt',
            dato: '17.05.2019',
            type: Hendelsetype.Dokumenter
        },
        {
            id: '234',
            navn: 'Inntektsmelding mottatt',
            dato: '17.05.2019',
            type: Hendelsetype.Dokumenter
        },
        {
            id: '345',
            navn: 'Sykmelding mottatt',
            dato: '09.05.2019',
            type: Hendelsetype.Dokumenter
        }
    ];
    return <Logg hendelser={hendelser} />;
};