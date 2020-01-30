import * as React from 'react'
import { Dagtype, Kilde, OppgaveStatus } from './Periodetabell'
import { Gradering, Kildelenke, Oppgavelenke, Status, Sykmeldingsperiode } from './Perioderad.styles'
import IkonEgenmelding from './icons/IkonEgenmelding'
import IkonFerie from './icons/IkonFerie'
import IkonSyk from './icons/IkonSyk'
import IkonAdvarsel from './icons/IkonAdvarsel'
import IkonLøst from './icons/IkonLøst'
import IkonFastsattAvSaksbehandler from './icons/IkonFastsattAvSaksbehandler'

interface StatusProps {
    status?: OppgaveStatus;
}

interface SykmeldingsperiodeProps extends StatusProps {
    dato: string;
    type?: Dagtype;
    kilde?: Kilde;
}

interface GraderingProps {
    gradering?: number;
    type?: Dagtype;
    kilde?: Kilde;
}

const ikon = (dagtype?: Dagtype) => {
    switch (dagtype) {
        case Dagtype.Syk:
            return <IkonSyk />;
        case Dagtype.Ferie:
            return <IkonFerie />;
        case Dagtype.Arbeidsdag:
            return <IkonEgenmelding />;
        case Dagtype.Egenmelding:
            return <IkonEgenmelding />;
        case Dagtype.Ubestemt:
        case Dagtype.Helg:
        default: return <span />;
    }
};

const kildelenke = (kilde?: Kilde, status?: OppgaveStatus) => {
    if (status === 'løst') return <IkonFastsattAvSaksbehandler />;
    return kilde?.link ? <Kildelenke href={kilde.link}>{kilde.label}</Kildelenke> : <Kildelenke>{kilde?.label}</Kildelenke>;
}

const Perioderad = {
    Status: ({ status }: StatusProps) => (
        <Status>
            {status === 'advarsel' && <IkonAdvarsel />}
            {status === 'løst' && <IkonLøst />}
        </Status>
    ),
    Sykmeldingsperiode: ({ type, dato, kilde, status }: SykmeldingsperiodeProps) => (
        <Sykmeldingsperiode>
            <span>{dato}</span>
            <span>{ikon(type)}</span>
            <span>{type}</span>
            <span>{kilde && kildelenke(kilde, status)}</span>
        </Sykmeldingsperiode>
    ),
    Gradering: ({ type, gradering, kilde }: GraderingProps) => (
        <Gradering>
            {gradering && <span>{`${gradering}%`}</span>}
            {kilde && kildelenke(kilde)}
            {type === Dagtype.Ubestemt && <Oppgavelenke href="#">Gå til oppgave</Oppgavelenke>}
        </Gradering>
    )
};

export default Perioderad;
