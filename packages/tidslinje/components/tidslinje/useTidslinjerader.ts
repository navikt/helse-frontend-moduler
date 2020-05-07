import dayjs, { Dayjs } from 'dayjs';
import { nanoid } from 'nanoid';
import { InternalEnkelTidslinje, PosisjonertPeriode } from '../types.internal';
import { EnkelTidslinje, Periode } from '../types.external';
import { breddeMellomDatoer } from './calc';
import { innenEtDøgn } from './filter';
import { sistePeriode } from './sort';
import { useMemo } from 'react';
import { TidslinjeProps } from './Tidslinje';

const posisjonertPeriode = (periode: Periode, tidslinjeSlutt: Dayjs, totaltAntallDager: number): PosisjonertPeriode => {
    const posisjonertPeriode = {
        id: periode.id || nanoid(),
        disabled: periode.disabled,
        fom: dayjs(periode.fom).startOf('day'),
        tom: dayjs(periode.tom).endOf('day'),
        status: periode.status,
        left: 0,
        width: 0,
        className: periode.className,
        etikett: periode.etikett
    };
    const left = breddeMellomDatoer(posisjonertPeriode.tom, tidslinjeSlutt, totaltAntallDager);
    const width = breddeMellomDatoer(
        posisjonertPeriode.fom.subtract(1, 'day'),
        posisjonertPeriode.tom,
        totaltAntallDager
    );
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

export const useTidslinjerader = (
    rader: EnkelTidslinje[],
    startDato: Dayjs,
    sluttDato: Dayjs
): InternalEnkelTidslinje[] =>
    useMemo(() => {
        const totaltAntallDager = sluttDato.diff(startDato, 'day');
        return rader.map(rad => ({
            id: nanoid(),
            perioder: rad.perioder
                .map((periode: Periode) => posisjonertPeriode(periode, sluttDato, totaltAntallDager))
                .sort(sistePeriode)
                .map(medSammenheng)
        }));
    }, [rader, startDato, sluttDato]);

export const tidligsteDato = ({ startDato, rader }: TidslinjeProps) =>
    startDato
        ? dayjs(startDato)
        : dayjs(
              rader
                  .flatMap(raden => raden.perioder)
                  .reduce((tidligst, perioden) => (perioden.fom < tidligst ? perioden.fom : tidligst), new Date())
          ).startOf('day');

export const senesteDato = ({ sluttDato, rader }: TidslinjeProps) =>
    sluttDato
        ? dayjs(sluttDato)
        : dayjs(
              rader
                  .flatMap(raden => raden.perioder)
                  .reduce((senest, perioden) => (perioden.tom > senest ? perioden.tom : senest), new Date(0))
          ).endOf('day');
