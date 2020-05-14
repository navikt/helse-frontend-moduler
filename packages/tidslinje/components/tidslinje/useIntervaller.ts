import { Dayjs } from 'dayjs';
import { EnkelPeriode, InternalEnkelTidslinje, Intervall, PosisjonertPeriode } from '../types.internal';
import { useMemo } from 'react';
import { erSynlig } from './filter';
import { breddeMellomDatoer, erLike } from './calc';
import { nanoid } from 'nanoid';
import { sisteEnklePeriode } from './sort';

const identiskePerioder = (perioden: EnkelPeriode, i: number, periodene: EnkelPeriode[]): boolean =>
    periodene.slice(0, i).find(other => erLike(perioden, other)) === undefined;

const harMinstEnAktivPeriode = (intervallet: Intervall, perioder: PosisjonertPeriode[]) => {
    const overlappendePerioder = perioder.filter(perioden => erLike(perioden, intervallet));
    return overlappendePerioder.find(perioden => !perioden.disabled) !== undefined;
};

export const useIntervaller = (rader: InternalEnkelTidslinje[], startDato: Dayjs, sluttDato: Dayjs): Intervall[] =>
    useMemo(() => {
        const totaltAntallDager = sluttDato.diff(startDato, 'day');
        const perioder = rader.flatMap(rad => rad.perioder);
        const aktivPeriode = perioder.find(periode => periode.active);
        return perioder
            .sort(sisteEnklePeriode)
            .filter(identiskePerioder)
            .map(
                (periode: EnkelPeriode): Intervall => {
                    const left = breddeMellomDatoer(periode.tom, sluttDato, totaltAntallDager);
                    const width = breddeMellomDatoer(periode.fom, periode.tom, totaltAntallDager);
                    return {
                        id: nanoid(),
                        fom: periode.fom,
                        tom: periode.tom,
                        left: left,
                        width: width + left > 100 ? 100 - left : width,
                        active: erLike(periode, aktivPeriode)
                    };
                }
            )
            .filter(erSynlig)
            .filter(intervallet => harMinstEnAktivPeriode(intervallet, perioder));
    }, [rader]);
