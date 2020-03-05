import React from 'react';
import Sakslinje from '../packages/sakslinje';
import Arbeidsgiver from '../packages/sakslinje/components/Arbeidsgiver';
import Saksmeny from '../packages/sakslinje/components/Saksmeny';

export default {
    component: Sakslinje,
    title: 'Sakslinje'
};

export const enkelSakslinje = () => {
    const midtTekst = ['Sykepleierhuset AS', '100%', '09.05.2019 - 19.05.2019'];

    return <Sakslinje midt={<Arbeidsgiver tekst={midtTekst} />} />;
};

export const medSaksmeny = () => {
    const midtTekst = ['Sykepleierhuset AS', '100%', '09.05.2019 - 19.05.2019'];

    return <Sakslinje venstre={<Saksmeny />} midt={<Arbeidsgiver tekst={midtTekst} />} />;
};
