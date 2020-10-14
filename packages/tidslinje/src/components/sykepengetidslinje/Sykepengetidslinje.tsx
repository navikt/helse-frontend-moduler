import React, { ReactNode, useMemo } from 'react';
import { Etikett, Periode } from '../types.external';
import { Tidslinje } from '../..';
import classNames from 'classnames';
import styles from './Sykepengetidslinje.less';
import { PeriodStatus } from '../types.internal';

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
    Infotrygdukjent = 'infotrygdukjent',
    UtbetaltAutomatisk = 'utbetaltAutomatisk',
    TilUtbetalingAutomatisk = 'tilUtbetalingAutomatisk'
}

export interface Sykepengeperiode {
    id: string;
    fom: Date;
    tom: Date;
    status: Vedtaksperiodetilstand;
    disabled?: boolean;
    className?: string;
    disabledLabel?: ReactNode;
    active?: boolean;
}

export interface SykepengetidslinjeProps {
    rader: Sykepengeperiode[][];
    startDato?: Date;
    sluttDato?: Date;
    onSelectPeriode?: (periode: Periode) => void;
    aktivRad?: number;
}

const etikettRenderer = (etikett: Etikett) => {
    return <span style={{ transform: 'translateX(50%)' }}>{etikett.label}</span>;
};

/**
 * Tilpasset tidslinje for sykepengeløsningen. Perioder sorteres i synkende rekkefølge (nyeste først).
 */
export const Sykepengetidslinje = ({
    rader,
    startDato,
    sluttDato,
    onSelectPeriode,
    aktivRad
}: SykepengetidslinjeProps) => {
    const periodeStatus = (tilstand: Vedtaksperiodetilstand): PeriodStatus => {
        switch (tilstand) {
            case Vedtaksperiodetilstand.TilUtbetaling:
            case Vedtaksperiodetilstand.Utbetalt:
            case Vedtaksperiodetilstand.UtbetaltAutomatisk:
            case Vedtaksperiodetilstand.TilUtbetalingAutomatisk:
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
            status: status,
            disabled: periode.disabled || status === 'inaktiv' || status === 'ukjent',
            className: classNames(periode.className, styles[periode.status]),
            disabledLabel: periode.disabledLabel,
            active: periode.active
        };
    };

    const _rader: Periode[][] = useMemo(() => rader.map((rad: Sykepengeperiode[]) => rad.map(toPeriode)), [rader]);

    return (
        <Tidslinje
            rader={_rader}
            startDato={startDato}
            sluttDato={sluttDato}
            onSelectPeriode={onSelectPeriode}
            aktivRad={aktivRad}
            retning="synkende"
            etikettRender={etikettRenderer}
        />
    );
};
