import React from 'react';
import BehandletAvInfotrygd from '../packages/behandletAvInfotrygd';

export default {
    component: BehandletAvInfotrygd,
    title: 'Innhold behandlet i Infotrygd',
    parameters: {
        componentSubtitle: 'Visning for innhold som er behandlet i Infotrygd.'
    }
};

export const behandletAvInfotrygd = () => {
    return (
        <BehandletAvInfotrygd tittel="Inngangsvilkår vurdert i Infotrygd">
            <div>test1</div>
            <span>test2</span>
            <div>test3</div>
            <p>test4</p>
        </BehandletAvInfotrygd>
    );
};

export const utenChildren = () => {
    return <BehandletAvInfotrygd tittel="Sykepengegrunnlag satt i Infotrygd" />;
};
