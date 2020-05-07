import React, { ReactNode } from 'react';
import { EnkelTidslinje, Periode, PeriodeStatus } from '../types.external';
import Tidslinje from '../tidslinje/Tidslinje';
import classNames from 'classnames';
import styles from './Sykepengetidslinje.less';

export enum Vedtaksperiodetilstand {
    TilUtbetaling = 'tilUtbetaling',
    Utbetalt = 'utbetalt',
    Oppgaver = 'oppgaver',
    Venter = 'venter',
    Avslag = 'avslag',
    IngenUtbetaling = 'ingenUtbetaling',
    Ukjent = 'ukjent',
    Feilet = 'feilet',
    TilInfotrygd = 'tilInfotrygd',
    Annullert = 'annullert'
}

export interface Sykepengeperiode {
    id: string;
    fom: Date;
    tom: Date;
    status: Vedtaksperiodetilstand;
    disabled?: boolean;
    className?: string;
    etikett?: ReactNode;
}

export interface EnkelSykepengetidslinje {
    perioder: Sykepengeperiode[];
}

export interface SykepengetidslinjeProps {
    rader: EnkelSykepengetidslinje[];
    startDato?: Date;
    sluttDato?: Date;
    onSelectPeriode?: (periode: Periode) => void;
}

const Sykepengetidslinje = ({ rader, startDato, sluttDato, onSelectPeriode }: SykepengetidslinjeProps) => {
    const periodeStatus = (tilstand: Vedtaksperiodetilstand): PeriodeStatus => {
        switch (tilstand) {
            case Vedtaksperiodetilstand.TilUtbetaling:
            case Vedtaksperiodetilstand.Utbetalt:
                return PeriodeStatus.Suksess;
            case Vedtaksperiodetilstand.Oppgaver:
                return PeriodeStatus.Advarsel;
            case Vedtaksperiodetilstand.Venter:
            case Vedtaksperiodetilstand.TilInfotrygd:
            case Vedtaksperiodetilstand.IngenUtbetaling:
            case Vedtaksperiodetilstand.Annullert:
                return PeriodeStatus.Inaktiv;
            case Vedtaksperiodetilstand.Avslag:
            case Vedtaksperiodetilstand.Feilet:
                return PeriodeStatus.Feil;
            case Vedtaksperiodetilstand.Ukjent:
            default:
                return PeriodeStatus.Ukjent;
        }
    };

    const _rader: EnkelTidslinje[] = rader.map((rad: EnkelSykepengetidslinje) => ({
        perioder: rad.perioder.map((periode: Sykepengeperiode) => {
            const status = periodeStatus(periode.status);
            return {
                id: periode.id,
                fom: periode.fom,
                tom: periode.tom,
                status,
                disabled: periode.disabled || status === PeriodeStatus.Inaktiv || status === PeriodeStatus.Ukjent,
                className: classNames(periode.className, styles[periode.status]),
                etikett: periode.etikett
            };
        })
    }));

    return <Tidslinje rader={_rader} startDato={startDato} sluttDato={sluttDato} onSelectPeriode={onSelectPeriode} />;
};

export default Sykepengetidslinje;
