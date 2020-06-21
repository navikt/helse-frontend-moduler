import React from 'react';
import Varsel, { Varseltype } from '../packages/varsel/src';
import styled from '@emotion/styled';
import Oppgavevarsel from '../packages/varsel/src/Oppgavevarsel';
import BehandletVarsel from '../packages/varsel/src/BehandletVarsel';
import BehandletAvInfotrygdVarsel from '../packages/varsel/src/BehandletAvInfotrygdVarsel';

export default {
    component: Varsel,
    title: 'Varsel'
};

const VarselContainer = styled('div')`
    display: flex;
    flex-direction: column;

    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const alleVarsler = () => (
    <VarselContainer>
        <Varsel>Dette er et infovarsel</Varsel>
        <Varsel type={Varseltype.Advarsel}>Dette er et advarselsvarsel</Varsel>
        <Varsel type={Varseltype.Suksess}>Dette er et suksessvarsel</Varsel>
        <Varsel type={Varseltype.Feil}>Dette er et feilvarsel</Varsel>
    </VarselContainer>
);

export const varselMedOppgave = () => <Oppgavevarsel oppgavelenke="#">Du har en ventende oppgave</Oppgavevarsel>;

export const behandletAvSaksbehandler = () => (
    <BehandletVarsel
        tittel="Inngangsvilkår vurdert første sykdomsdag"
        saksbehandler="Hanne Jansen"
        vurderingsdato="01.05.2017"
    >
        <p>
            Dette varselet indikerer at innholdet har blitt vurdert <br />
            og behandlet av en saksbehandler.
        </p>
    </BehandletVarsel>
);

export const behandletAvInfotrygd = () => (
    <BehandletAvInfotrygdVarsel tittel="Inngangsvilkår vurdert i Infotrygd">
        <p>
            Dette varselet indikerer at innholdet har blitt vurdert <br />
            og behandlet av en saksbehandler i Infotrygd.
        </p>
    </BehandletAvInfotrygdVarsel>
);
