import React, { ReactNode } from 'react';
import IkonInfo from './icons/IkonInfo';
import IkonSuksess from './icons/IkonSuksess';
import { VarselContainer } from './Varsel.styles';
import IkonAdvarsel from './icons/IkonAdvarsel';
import IkonFeil from './icons/IkonFeil';

export type Varseltype = 'info' | 'suksess' | 'advarsel' | 'feil';

export interface VarselProps {
    text: string;
    type?: Varseltype;
    children?: ReactNode | ReactNode[];
    className?: string;
}

const ikon = (type: Varseltype) => {
    switch (type) {
        case 'suksess':
            return <IkonSuksess />;
        case 'advarsel':
            return <IkonAdvarsel />;
        case 'feil':
            return <IkonFeil />;
        case 'info':
        default:
            return <IkonInfo />;
    }
};

/**
 * Bruk `Varsel`når du skal formidle viktig informasjon til bruker.
 * Dette kan for eksempel være informasjon knyttet til endringer, hendelser utløst av bruker eller et system, eller status på en vedtaksperiode.
 *
 * `Varsel` kan ta en valgfri `children` prop. Denne vil rendres til høyre for varselteksten.
 */
const Varsel = ({ text, children, className = 'Varsel', type = 'info' }: VarselProps) => {
    return (
        <VarselContainer type={type} className={className}>
            {ikon(type)}
            <p>{text}</p>
            {children}
        </VarselContainer>
    );
};

export default Varsel;
