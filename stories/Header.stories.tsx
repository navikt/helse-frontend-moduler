import React from 'react';
import Header from '../packages/header/src';
import Søk from '../packages/header/src/Søk';
import HeaderEnkel from '../packages/header/src/HeaderEnkel';
import { Bruker } from '../packages/header/src/Header';

const brukerinfo = {
    navn: 'Kong Harald',
    ident: 'D123456',
    enhet: 'NAV Slottet',
    rolle: 'Konge'
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
