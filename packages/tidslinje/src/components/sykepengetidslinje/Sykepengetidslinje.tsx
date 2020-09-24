import React, { ReactNode, useMemo } from 'react';
import { Periode } from '../types.external';
import { Tidslinje } from '../..';
import classNames from 'classnames';
import styles from './Sykepengetidslinje.less';
import { Periodestatus } from '../types.internal';

export enum Vedtaksperiodetilstand {
    TilUtbetaling = 'tilUtbetaling',
    Utbetalt = 'utbetalt',
    UtbetaltIInfotrygd = 'utbetaltIInfotrygd',
    Oppgaver = 'oppgaver',
    Venter = 'venter',
    Avslag = 'avslag',
    IngenUtbetaling = 'ingenUtbetaling',
    KunFerie = 'kunFerie',
    Ukjent = 'ukjent',
    Feilet = 'feilet',
    TilInfotrygd = 'tilInfotrygd',
    Annullert = 'annullert',
    Infotrygdferie = 'infotrygdferie',
    Infotrygdukjent = 'infotrygdukjent'
}

export interface Sykepengeperiode {
    id: string;
    fom: Date;
    tom: Date;
    status: Vedtaksperiodetilstand;
    disabled?: boolean;
    className?: string;
    disabledLabel?: ReactNode;
}

export interface SykepengetidslinjeProps {
    rader: Sykepengeperiode[][];
    startDato?: Date;
    sluttDato?: Date;
    onSelectPeriode?: (periode: Periode) => void;
    aktivPeriode?: { fom: Date; tom: Date };
}

/**
 * Tidslinje tilpasset sykepengeløsningen.
 */
export const Sykepengetidslinje = ({
    rader,
    startDato,
    sluttDato,
    onSelectPeriode,
    aktivPeriode
}: SykepengetidslinjeProps) => {
    const periodeStatus = (tilstand: Vedtaksperiodetilstand): Periodestatus => {
        switch (tilstand) {
            case Vedtaksperiodetilstand.TilUtbetaling:
            case Vedtaksperiodetilstand.Utbetalt:
                return 'suksess';
            case Vedtaksperiodetilstand.Oppgaver:
                return 'advarsel';
            case Vedtaksperiodetilstand.Venter:
            case Vedtaksperiodetilstand.TilInfotrygd:
            case Vedtaksperiodetilstand.IngenUtbetaling:
            case Vedtaksperiodetilstand.UtbetaltIInfotrygd:
            case Vedtaksperiodetilstand.KunFerie:
            case Vedtaksperiodetilstand.Infotrygdferie:
            case Vedtaksperiodetilstand.Infotrygdukjent:
                return 'inaktiv';
            case Vedtaksperiodetilstand.Annullert:
            case Vedtaksperiodetilstand.Avslag:
            case Vedtaksperiodetilstand.Feilet:
                return 'feil';
            case Vedtaksperiodetilstand.Ukjent:
            default:
                return 'ukjent';
        }
    };

    const toPeriode = (periode: Sykepengeperiode): Periode => {
        const status = periodeStatus(periode.status);
        return {
            id: periode.id,
            fom: periode.fom,
            tom: periode.tom,
            status,
            disabled: periode.disabled || status === 'inaktiv' || status === 'ukjent',
            className: classNames(periode.className, styles[periode.status]),
            disabledLabel: periode.disabledLabel
        };
    };

    const _rader: Periode[][] = useMemo(() => rader.map((rad: Sykepengeperiode[]) => rad.map(toPeriode)), [rader]);

    return (
        <Tidslinje
            rader={_rader}
            startDato={startDato}
            sluttDato={sluttDato}
            onSelectPeriode={onSelectPeriode}
            aktivPeriode={aktivPeriode}
        />
    );
};
