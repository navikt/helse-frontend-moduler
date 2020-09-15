import dayjs, { Dayjs } from 'dayjs';
import { nanoid } from 'nanoid';
import { InternalEnkelTidslinje, PosisjonertPeriode } from '../types.internal';
import { Periode } from '../types.external';
import { breddeMellomDatoer } from './calc';
import { innenEtDøgn } from './filter';
import { sistePeriode } from './sort';
import { useMemo } from 'react';
import { TidslinjeProps } from './Tidslinje';

const posisjonertPeriode = (
    periode: Periode,
    tidslinjeSlutt: Dayjs,
    totaltAntallDager: number,
    direction: 'left' | 'right' = 'left'
): PosisjonertPeriode => {
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
    const horizontalPosition = breddeMellomDatoer(displayTom, tidslinjeSlutt, totaltAntallDager);
    const width = breddeMellomDatoer(displayFom, displayTom, totaltAntallDager);
    const cropped = horizontalPosition + width > 100;
    const outOfBounds = horizontalPosition >= 100;
    return {
        ...posisjonertPeriode,
        direction: direction,
        horizontalPosition: horizontalPosition,
        width: cropped ? 100 - horizontalPosition : width,
        cropped: cropped,
        outOfBounds: outOfBounds
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
    rader: Periode[][],
    startDato: Dayjs,
    sluttDato: Dayjs,
    direction: 'left' | 'right'
): InternalEnkelTidslinje[] =>
    useMemo(() => {
        const totaltAntallDager = sluttDato.diff(startDato, 'day');
        return rader.map(perioder => ({
            id: nanoid(),
            perioder: perioder
                .map((periode: Periode) => posisjonertPeriode(periode, sluttDato, totaltAntallDager, direction))
                .sort(sistePeriode)
                .map(medSammenheng)
        }));
    }, [rader, startDato, sluttDato]);

const tidligsteDato = (tidligst: Date, periode: Periode) => (periode.fom < tidligst ? periode.fom : tidligst);

const tidligsteFomDato = (rader: Periode[][]) => rader.flat().reduce(tidligsteDato, new Date());

export const useTidligsteDato = ({ startDato, rader }: TidslinjeProps) =>
    useMemo(() => (startDato ? dayjs(startDato) : dayjs(tidligsteFomDato(rader)).startOf('day')), [startDato, rader]);

const senesteDato = (senest: Date, periode: Periode) => (periode.tom > senest ? periode.tom : senest);

const senesteTomDato = (rader: Periode[][]) => rader.flat().reduce(senesteDato, new Date(0));

export const useSenesteDato = ({ sluttDato, rader }: TidslinjeProps) =>
    useMemo(() => (sluttDato ? dayjs(sluttDato) : dayjs(senesteTomDato(rader)).add(1, 'day')), [sluttDato, rader]);
