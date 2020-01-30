import Select from '../../components/Select';
import React from 'react';

export default {
    component: Select,
    title: 'Select/Select',
    parameters: {
        componentSubtitle: 'Select-komponent for å velge vedtaksperiode.'
    }
};

export const select = () => {
    return (
        <Select>
            <option>01.01.2018 - 23.01.2018</option>
            <option>01.02.2018 - 23.02.2018</option>
            <option>01.03.2018 - 23.03.2018</option>
            <option>01.04.2018 - 23.04.2018</option>
        </Select>
    );
};
