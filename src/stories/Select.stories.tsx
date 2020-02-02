import Select from '../components/Select';
import React from 'react';
import { Alternativ } from '../../components/Select/Select';

export default {
    component: Select,
    title: 'Select (wip)',
    parameters: {
        componentSubtitle: 'Select-komponent for å velge vedtaksperiode.'
    }
};

export const select = () => {
    const perioder: Alternativ[] = [
        { value: '09.05.2017 - 19.05.2017', id: 1 },
        { value: '20.05.2017 - 20.06.2017', id: 2 },
        { value: '21.07.2017 - 13.08.2017', id: 3 },
        { value: '17.08.2017 - 05.09.2017', id: 4 }
    ];
    return <Select alternativer={perioder} />;
};
