import React from 'react';
import Header from '../packages/header';
import Søk from '../packages/header/Søk';
import HeaderEnkel from '../packages/header/HeaderEnkel';
import { Bruker } from '../packages/header/Header';

const brukerinfo = {
    navn: 'Sjaman Durek',
    ident: 'D123456',
    enhet: 'NAV Slottet',
    rolle: 'Sjaman'
};

export default {
    title: 'Header',
    component: Header,
    subcomponents: { Bruker },
    parameters: {
        componentSubtitle: 'Sideheader for interne flater'
    }
};

export const header = () => {
    return <Header tittel="NAV Sykepenger" brukerinfo={brukerinfo} />;
};

export const medInput = () => {
    return (
        <Header tittel="NAV Sykepenger" brukerinfo={brukerinfo}>
            <Søk onSøk={søkeverdi => console.log('Du søkte etter:', søkeverdi)} />
        </Header>
    );
};

export const utenPopover = () => {
    return (
        <HeaderEnkel tittel="NAV Sykepenger" brukerinfo={brukerinfo}>
            <Søk onSøk={søkeverdi => console.log('Du søkte etter:', søkeverdi)} />
        </HeaderEnkel>
    );
};
