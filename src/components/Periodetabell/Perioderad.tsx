import React, { useContext } from 'react';
import { Gradering, Kildelenke, Oppgavelenke, Status, Sykmeldingsperiode } from './Perioderad.styles';
import IkonAdvarsel from './icons/IkonAdvarsel';
import IkonLøst from './icons/IkonLøst';
import IkonFastsattAvSaksbehandler from './icons/IkonFastsattAvSaksbehandler';
import { ikon } from './icons/Ikon';
import { Dagtype, Kilde, OppgaveStatus } from './types';
import PeriodeContext from './PeriodeContext';
import Select from './input/Select';

interface StatusProps {
    status?: OppgaveStatus;
    overstyrer?: boolean;
}

interface SykmeldingsperiodeProps extends StatusProps {
    i: number;
    dato: string;
    type?: Dagtype;
    kilde?: Kilde;
}

interface GraderingProps extends StatusProps {
    i: number;
    kilde?: Kilde;
    gradering?: number;
}

const kildelenke = (kilde?: Kilde, status?: OppgaveStatus) => {
    if (status === 'løst') return <IkonFastsattAvSaksbehandler />;
    return kilde?.link ? (
        <Kildelenke href={kilde?.link}>{kilde?.label}</Kildelenke>
    ) : (
        <Kildelenke>{kilde?.label}</Kildelenke>
    );
};

const _Status = ({ status }: StatusProps) => (
    <Status>
        {status === 'advarsel' && <IkonAdvarsel />}
        {status === 'løst' && <IkonLøst />}
    </Status>
);

const _Sykmeldingsperiode = ({ type, dato, kilde, status, i }: SykmeldingsperiodeProps) => {
    const { overstyrer, oppdaterType } = useContext(PeriodeContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => oppdaterType(i, event.target.value as Dagtype);

    const renderType = overstyrer ? (
        <Select onChange={onChange}>
            {Object.values(Dagtype as object).map((dag, index) => (
                <option key={index} selected={dag === type}>
                    {dag}
                </option>
            ))}
        </Select>
    ) : (
        <span>{type}</span>
    );

    return (
        <Sykmeldingsperiode>
            <span>{dato}</span>
            <span>{ikon(type)}</span>
            {renderType}
            <span>{kilde && kildelenke(kilde, status)}</span>
        </Sykmeldingsperiode>
    );
};

const _Gradering = ({ gradering, kilde, status, i }: GraderingProps) => {
    const { overstyrer, oppdaterGradering } = useContext(PeriodeContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => oppdaterGradering(i, parseInt(event.target.value));

    const renderGradering = overstyrer ? (
        <input type="number" value={gradering || ''} onInput={onChange} />
    ) : (
        <span>{`${gradering}%`}</span>
    );

    return (
        <Gradering>
            {gradering !== undefined && renderGradering}
            {kilde && kildelenke(kilde)}
            {status === 'advarsel' && <Oppgavelenke href="#">Gå til oppgave</Oppgavelenke>}
        </Gradering>
    );
};

const Perioderad = {
    Status: _Status,
    Sykmeldingsperiode: _Sykmeldingsperiode,
    Gradering: _Gradering
};

export default Perioderad;
