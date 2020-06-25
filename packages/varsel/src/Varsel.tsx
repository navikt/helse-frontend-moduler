import React, { ReactNode } from 'react';
import IkonInfo from './icons/IkonInfo';
import IkonSuksess from './icons/IkonSuksess';
import IkonAdvarsel from './icons/IkonAdvarsel';
import IkonFeil from './icons/IkonFeil';
import styles from './Varsel.less';
import classNames from 'classnames';

export enum Varseltype {
    Info = 'info',
    Suksess = 'suksess',
    Advarsel = 'advarsel',
    Feil = 'feil'
}

export interface VarselProps {
    type?: Varseltype;
    children?: ReactNode | ReactNode[];
    className?: string;
}

const ikon = (type: Varseltype) => {
    switch (type) {
        case Varseltype.Suksess:
            return <IkonSuksess />;
        case Varseltype.Advarsel:
            return <IkonAdvarsel />;
        case Varseltype.Feil:
            return <IkonFeil />;
        case Varseltype.Info:
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
export const Varsel = ({ children, className = 'Varsel', type = Varseltype.Info }: VarselProps) => (
    <div className={classNames(className, styles.container, styles[type])}>
        {ikon(type)}
        {children}
    </div>
);

export interface SpesifiktVarselProps {
    children?: ReactNode | ReactNode[];
    className?: string;
}

export const Infovarsel = ({ children, className }: SpesifiktVarselProps) => (
    <Varsel className={className} type={Varseltype.Info}>
        {children}
    </Varsel>
);

export const Advarselvarsel = ({ children, className }: SpesifiktVarselProps) => (
    <Varsel className={className} type={Varseltype.Advarsel}>
        {children}
    </Varsel>
);

export const Suksessvarsel = ({ children, className }: SpesifiktVarselProps) => (
    <Varsel className={className} type={Varseltype.Suksess}>
        {children}
    </Varsel>
);

export const Feilvarsel = ({ children, className }: SpesifiktVarselProps) => (
    <Varsel className={className} type={Varseltype.Feil}>
        {children}
    </Varsel>
);
