import React from 'react';
import BehandletInnhold from '../packages/behandletInnhold';

export default {
    component: BehandletInnhold,
    title: 'Behandlet innhold',
    parameters: {
        componentSubtitle: 'Varsel som wrapper data en saksbehandler har fattet en vurdering på.'
    }
};

export const behandletInnhold = () => {
    return (
        <BehandletInnhold
            tittel="Inngangsvilkår vurdert første sykdomsdag"
            saksbehandler="Hanne Jansen"
            vurderingsdato="01.05.2017"
        >
            <div>test1</div>
            <span>test2</span>
            <div>test3</div>
            <p>test4</p>
        </BehandletInnhold>
    );
};

export const utenChildren = () => {
    return (
        <BehandletInnhold
            tittel="Inngangsvilkår vurdert første sykdomsdag"
            saksbehandler="Hanne Jansen"
            vurderingsdato="01.05.2017"
        />
    );
};
