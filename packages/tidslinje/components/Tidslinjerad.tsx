import React, { useContext } from 'react';
import { EnkelTidslinje, Inntektstype, Skalastørrelse, Vedtaksperiode } from '../types';
import { isoDato, kalkulerPosisjonOgBredde } from '../calc';
import { TidslinjeContext } from './Tidslinje';
import IkonArbeidsgiver from '../icons/IkonArbeidsgiver';
import IkonInfotrygd from '../icons/IkonInfotrygd';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';

type Sammenheng = 'høyre' | 'venstre' | 'begge';

interface PosisjonertVedtaksperiode {
    left: number;
    width: number;
    erAvkuttet: boolean;
    sammenheng?: Sammenheng;
    value: Vedtaksperiode;
}

const ikon = (inntektstype: Inntektstype) => {
    switch (inntektstype) {
        case 'arbeidsgiver':
            return <IkonArbeidsgiver />;
        case 'ytelse':
            return <IkonInfotrygd />;
    }
};

const tilPosisjonertVedtaksperiode = (
    periode: Vedtaksperiode,
    skalastørrelse: Skalastørrelse,
    sisteDag: Dayjs
) => {
    const { left, width } = kalkulerPosisjonOgBredde(
        isoDato(periode.fom),
        isoDato(periode.tom),
        skalastørrelse,
        sisteDag
    );
    const erAvkuttet = left + width > 100;
    const justertBredde = left + width > 100 ? 100 - left : width;
    return { left, width: justertBredde, value: periode, erAvkuttet };
};

const nyesteFørst = (p1: PosisjonertVedtaksperiode, p2: PosisjonertVedtaksperiode) =>
    p1.left - p2.left;

const erSammenhengende = (dato1: string, dato2: string) =>
    dayjs(dato1).diff(dayjs(dato2), 'day') <= 1;

const medSammenheng = (
    posisjonertPeriode: PosisjonertVedtaksperiode,
    i: number,
    vedtaksperioder: Vedtaksperiode[]
) => {
    const sammenhengFraVenstre =
        i > 0 && erSammenhengende(vedtaksperioder[i - 1].fom, posisjonertPeriode.value.tom);
    const sammenhengFraHøyre =
        i < vedtaksperioder.length - 1 &&
        erSammenhengende(posisjonertPeriode.value.fom, vedtaksperioder[i + 1].tom);

    const sammenheng: Sammenheng | undefined =
        sammenhengFraHøyre && sammenhengFraVenstre
            ? 'begge'
            : sammenhengFraHøyre
            ? 'høyre'
            : sammenhengFraVenstre
            ? 'venstre'
            : undefined;

    return { ...posisjonertPeriode, sammenheng };
};

const Tidslinjerad = ({ inntektstype, inntektsnavn, vedtaksperioder }: EnkelTidslinje) => {
    const { onSelect, skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    const sortertePerioder: PosisjonertVedtaksperiode[] = vedtaksperioder
        .map(periode => tilPosisjonertVedtaksperiode(periode, skalastørrelse, sisteDag))
        .sort(nyesteFørst)
        .map((periode, i) => medSammenheng(periode, i, vedtaksperioder));

    const className = (periode: PosisjonertVedtaksperiode) =>
        classNames(
            styles.periode,
            periode.erAvkuttet && styles.avkuttet,
            periode.width < 3 && styles.mini,
            periode.sammenheng === 'begge' && styles.sammenhengendeFraBegge,
            periode.sammenheng === 'høyre' && styles.sammenhengendeFraHøyre,
            periode.sammenheng === 'venstre' && styles.sammenhengendeFraVenstre,
            styles[periode.value.status]
        );

    return (
        <div className={classNames('Tidslinjerad', styles.rad)}>
            <p className={styles.inntektskilde}>
                {ikon(inntektstype)}
                {inntektsnavn}
            </p>
            <div className={styles.perioder}>
                <hr />
                {sortertePerioder.map((periode: PosisjonertVedtaksperiode, index) => (
                    <button
                        className={className(periode)}
                        key={index}
                        onClick={() => onSelect(periode.value)}
                        tabIndex={-1}
                        style={{
                            left: `${periode.left}%`,
                            width: `${periode.width}%`
                        }}
                        aria-label={`${periode.value.status} fra ${periode.value.fom} til og med ${periode.value.tom}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tidslinjerad;
