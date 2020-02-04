import React from 'react';
import { Container, Søkefelt, Søkeknapp } from './Søk.styles';
import IkonSøk from './icons/IkonSøk';

export interface SøkProps {
    onSøk: (value: string) => void;
}

const Søk = ({ onSøk }: SøkProps) => {
    return (
        <Container>
            <Søkefelt />
            <Søkeknapp>
                <IkonSøk />
            </Søkeknapp>
        </Container>
    );
};

export default Søk;
