import * as React from 'react';
import { Kilde, Dagtype } from './Periodetabell';
import { Cell, Gradering, Kildelenke, Sykmeldingsperiode } from './Perioderad.styles';
import IkonEgenmelding from './icons/IkonEgenmelding';
import IkonFerie from './icons/IkonFerie';
import IkonSyk from './icons/IkonSyk';

const ikon = (dagtype: Dagtype) => {
    switch (dagtype) {
        case Dagtype.Syk:
            return <IkonSyk />;
        case Dagtype.Helg:
            return <span />;
        case Dagtype.Ferie:
            return <IkonFerie />;
        case Dagtype.Ubestemt:
            return <IkonEgenmelding />;
        case Dagtype.Arbeidsdag:
            return <IkonEgenmelding />;
        case Dagtype.Egenmelding:
            return <IkonEgenmelding />;
    }
};

interface CommonProps {
    type: Dagtype;
    kilde?: Kilde;
}

interface SykmeldingsperiodeProps extends CommonProps {
    dato: string;
}

interface GraderingProps extends CommonProps {
    gradering?: number;
}

const kildelenke = (kilde?: Kilde) =>
    kilde?.link ? <Kildelenke href={kilde.link}>{kilde.label}</Kildelenke> : <Kildelenke>{kilde?.label}</Kildelenke>;

const Perioderad = {
    Sykmeldingsperiode: ({ type, dato, kilde }: SykmeldingsperiodeProps) => (
        <Sykmeldingsperiode dagtype={type}>
            <Cell>{dato}</Cell>
            <Cell>{ikon(type)}</Cell>
            <Cell>
                <span>{type}</span>
            </Cell>
            <Cell>{kilde && kildelenke(kilde)}</Cell>
        </Sykmeldingsperiode>
    ),
    Gradering: ({ type, gradering, kilde }: GraderingProps) => (
        <Gradering dagtype={type}>
            {gradering && <Cell>{`${gradering}%`}</Cell>}
            {kilde && kildelenke(kilde)}
        </Gradering>
    )
};

export default Perioderad;
