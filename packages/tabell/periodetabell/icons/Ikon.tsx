import React, { ReactNode } from 'react';
import { IconProps } from './types';
import IkonSyk from './IkonSyk';
import IkonFerie from './IkonFerie';
import IkonEgenmelding from './IkonEgenmelding';
import { Dagtype } from '../types';
import IkonArbeidsgiverperiode from './IkonArbeidsgiverperiode';

type Children = { children: ReactNode | ReactNode[] };

export const ikon = (dagtype?: Dagtype) => {
    switch (dagtype) {
        case Dagtype.Syk:
            return <IkonSyk />;
        case Dagtype.Ferie:
            return <IkonFerie />;
        case Dagtype.Arbeidsdag:
            return <IkonEgenmelding />;
        case Dagtype.Egenmelding:
            return <IkonEgenmelding />;
        case Dagtype.Arbeidsgiverperiode:
            return <IkonArbeidsgiverperiode />;
        case Dagtype.Ubestemt:
        case Dagtype.Helg:
        default:
            return <span />;
    }
};

const Ikon = ({ width = 16, height = 16, children }: IconProps & Children) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
            xmlSpace="preserve"
        >
            {children}
        </svg>
    );
};

export default Ikon;
