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
const Varsel = ({ children, className = 'Varsel', type = Varseltype.Info }: VarselProps) => (
    <div className={classNames(className, styles.container, styles[type])}>
        {ikon(type)}
        {children}
    </div>
);

export default Varsel;
