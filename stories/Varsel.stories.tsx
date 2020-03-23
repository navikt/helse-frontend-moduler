import React from 'react';
import Varsel, { Varseltype } from '../packages/varsel';
import styled from '@emotion/styled';
import Oppgavevarsel from '../packages/varsel/Oppgavevarsel';

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

export const alleVarsler = () => {
    return (
        <VarselContainer>
            <Varsel>Dette er et infovarsel</Varsel>
            <Varsel type={Varseltype.Advarsel}>Dette er et advarselsvarsel</Varsel>
            <Varsel type={Varseltype.Suksess}>Dette er et suksessvarsel</Varsel>
            <Varsel type={Varseltype.Feil}>Dette er et feilvarsel</Varsel>
        </VarselContainer>
    );
};

export const varselMedOppgave = () => {
    return <Oppgavevarsel oppgavelenke="#">Du har en ventende oppgave</Oppgavevarsel>;
};
