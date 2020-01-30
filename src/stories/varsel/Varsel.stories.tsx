import React from 'react';
import Varsel from '../../components/Varsel';
import styled from '@emotion/styled';

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
            <Varsel text="Dette er et infovarsel" />
            <Varsel text="Dette er et advarselsvarsel" type="advarsel" />
            <Varsel text="Dette er et suksessvarsel" type="suksess" />
            <Varsel text="Dette er et feilvarsel" type="feil" />
        </VarselContainer>
    );
};

export const varselMedOppgave = () => {
    return (
        <Varsel text="Du har en ventende oppgave" type="advarsel">
            <a href="#">Gå til oppgave</a>
        </Varsel>
    );
};
