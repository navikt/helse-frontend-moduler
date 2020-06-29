import dayjs, { Dayjs } from 'dayjs';
import { nanoid } from 'nanoid';
import { InternalEnkelTidslinje, PosisjonertPeriode } from '../types.internal';
import { Periode } from '../types.external';
import { breddeMellomDatoer } from './calc';
import { innenEtDøgn } from './filter';
import { sistePeriode } from './sort';
import { useMemo } from 'react';
import { TidslinjeProps } from './Tidslinje';

const posisjonertPeriode = (periode: Periode, tidslinjeSlutt: Dayjs, totaltAntallDager: number): PosisjonertPeriode => {
    const fom = dayjs(periode.fom);
    const tom = dayjs(periode.tom);
    const posisjonertPeriode = {
        id: periode.id || nanoid(),
        disabled: periode.disabled,
        status: periode.status,
        className: periode.className,
        disabledLabel: periode.disabledLabel,
        fom,
        tom
    };
    const displayFom = fom.startOf('day');
    const displayTom = tom.endOf('day');
    const left = breddeMellomDatoer(displayTom, tidslinjeSlutt, totaltAntallDager);
    const width = breddeMellomDatoer(displayFom, displayTom, totaltAntallDager);
    const cropped = left + width > 100;
    const outOfBounds = left >= 100;
    return {
        ...posisjonertPeriode,
        left,
        width: cropped ? 100 - left : width,
        cropped,
        outOfBounds
    };
};

const medSammenheng = (periode: PosisjonertPeriode, i: number, perioder: PosisjonertPeriode[]): PosisjonertPeriode => {
    const sammenhengFraVenstre = i > 0 && innenEtDøgn(perioder[i - 1].fom, periode.tom);
    const sammenhengFraHøyre = i < perioder.length - 1 && innenEtDøgn(periode.fom, perioder[i + 1].tom);
    if (sammenhengFraVenstre && sammenhengFraHøyre) return { ...periode, sammenheng: 'begge' };
    if (sammenhengFraVenstre) return { ...periode, sammenheng: 'venstre' };
    if (sammenhengFraHøyre) return { ...periode, sammenheng: 'høyre' };
    return periode;
};

export const useTidslinjerader = (rader: Periode[][], startDato: Dayjs, sluttDato: Dayjs): InternalEnkelTidslinje[] =>
    useMemo(() => {
        const totaltAntallDager = sluttDato.diff(startDato, 'day');
        return rader.map(perioder => ({
            id: nanoid(),
            perioder: perioder
                .map((periode: Periode) => posisjonertPeriode(periode, sluttDato, totaltAntallDager))
                .sort(sistePeriode)
                .map(medSammenheng)
        }));
    }, [rader, startDato, sluttDato]);

export const tidligsteDato = ({ startDato, rader }: TidslinjeProps) =>
    useMemo(
        () =>
            startDato
                ? dayjs(startDato)
                : dayjs(
                      rader
                          .flat()
                          .reduce(
                              (tidligst, perioden) => (perioden.fom < tidligst ? perioden.fom : tidligst),
                              new Date()
                          )
                  ).startOf('day'),
        [startDato, rader]
    );

export const senesteDato = ({ sluttDato, rader }: TidslinjeProps) =>
    useMemo(
        () =>
            sluttDato
                ? dayjs(sluttDato)
                : dayjs(
                      rader
                          .flat()
                          .reduce((senest, perioden) => (perioden.tom > senest ? perioden.tom : senest), new Date(0))
                  ).add(1, 'day'),
        [sluttDato, rader]
    );
