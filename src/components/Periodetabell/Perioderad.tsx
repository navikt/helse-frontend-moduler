import * as React from 'react';
import { Dag, Dagtype } from './Periodetabell';
import { Cell, Gradering, Kilde, Sykmeldingsperiode } from './Perioderad.styles';
import IkonEgenmelding from './icons/IkonEgenmelding';
import IkonFerie from './icons/IkonFerie';
import IkonSyk from './icons/IkonSyk';

const ikon = (dagtype: Dagtype) => {
    switch (dagtype) {
        case Dagtype.Syk: return <IkonSyk />;
        case Dagtype.Helg: return <span />;
        case Dagtype.Ferie: return <IkonFerie />;
        case Dagtype.Ubestemt: return <IkonEgenmelding />;
        case Dagtype.Arbeidsdag: return <IkonEgenmelding />;
        case Dagtype.Egenmelding: return <IkonEgenmelding />;
    }
};

const Perioderad = ({ type, dato, gradering, kilde }: Dag) => {
    const kildeLenke = kilde?.link
        ? <Kilde href={kilde.link}>{kilde.label}</Kilde>
        : <Kilde>{kilde?.label}</Kilde>;
    return <>
        <Sykmeldingsperiode dagtype={type}>
            <Cell>{dato}</Cell>
            <Cell>{ikon(type)}</Cell>
            <Cell>
                <span>{type}</span>
            </Cell>
            <Cell>
                {kilde && kildeLenke}
            </Cell>
        </Sykmeldingsperiode>
        <Gradering dagtype={type}>
            {gradering && <Cell>{`${gradering}%`}</Cell>}
            {kilde && kildeLenke}
        </Gradering>
    </>;
};

export default Perioderad;
