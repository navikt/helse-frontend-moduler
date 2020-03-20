import React, { useContext } from 'react';
import IkonAdvarsel from './icons/IkonAdvarsel';
import IkonLøst from './icons/IkonLøst';
import IkonFastsattAvSaksbehandler from './icons/IkonFastsattAvSaksbehandler';
import { ikon } from './icons/Ikon';
import { Dagstatus, Dagtype, Kilde } from './types';
import SykmeldingContext from './sykmeldingstabell/SykmeldingContext';
import Select from './input/Select';
import styles from './Perioderad.less';
import IkonFeil from './icons/IkonFeil';

export interface StatusProps {
    status?: Dagstatus;
    overstyrer?: boolean;
}

export interface SykmeldingsperiodeProps extends StatusProps {
    i: number;
    dato: string;
    type?: Dagtype;
    kilde?: Kilde;
}

export interface GraderingProps extends StatusProps {
    i: number;
    kilde?: Kilde;
    gradering?: number;
}

export const kildelenke = (kilde?: Kilde, status?: Dagstatus) => {
    if (status === Dagstatus.Suksess) return <IkonFastsattAvSaksbehandler />;
    return kilde?.link ? (
        <a className={styles.aktivKildelenke} href={kilde?.link}>
            {kilde?.label}
        </a>
    ) : (
        <a className={styles.kildelenke}>{kilde?.label}</a>
    );
};

export const Status = ({ status }: StatusProps) => (
    <div className={styles.status}>
        {status === Dagstatus.Advarsel && <IkonAdvarsel />}
        {status === Dagstatus.Suksess && <IkonLøst />}
        {status === Dagstatus.Feil && <IkonFeil />}
    </div>
);

export const Sykmeldingsperiode = ({ type, dato, kilde, status, i }: SykmeldingsperiodeProps) => {
    const { overstyrer, oppdaterType } = useContext(SykmeldingContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => oppdaterType(i, event.target.value as Dagtype);

    const renderType =
        overstyrer && type !== Dagtype.Helg ? (
            <Select onChange={onChange}>
                {Object.values(Dagtype as object)
                    .filter(type => type !== Dagtype.Helg)
                    .map((dag, index) => (
                        <option key={index} selected={dag === type}>
                            {dag}
                        </option>
                    ))}
            </Select>
        ) : (
            <span>{type}</span>
        );

    return (
        <div className={styles.sykmeldingsperiode}>
            <span>{dato}</span>
            <span>{ikon(type)}</span>
            {renderType}
            <span>{kilde && kildelenke(kilde, status)}</span>
        </div>
    );
};

export const Gradering = ({ gradering, kilde, status, i }: GraderingProps) => {
    const { overstyrer, oppdaterGradering } = useContext(SykmeldingContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => oppdaterGradering(i, parseInt(event.target.value));

    const renderGradering = overstyrer ? (
        <input type="number" value={gradering || ''} onInput={onChange} />
    ) : (
        <span>{`${gradering}%`}</span>
    );

    return (
        <div className={styles.gradering}>
            {gradering !== undefined && renderGradering}
            {kilde && kildelenke(kilde)}
            {status === Dagstatus.Advarsel && (
                <a className={styles.oppgavelenke} href="#">
                    Gå til oppgave
                </a>
            )}
        </div>
    );
};

export default { Status, Sykmeldingsperiode, Gradering };
