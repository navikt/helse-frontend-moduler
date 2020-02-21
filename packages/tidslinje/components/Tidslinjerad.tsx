import React, { useContext } from 'react';
import { EnkelTidslinje, Inntektstype, VedtaksperiodeStatus } from '../types';
import { isoDato, kalkulerPosisjonOgBredde } from '../calc';
import { TidslinjeContext } from './Tidslinje';
import IkonArbeidsgiver from '../icons/IkonArbeidsgiver';
import IkonInfotrygd from '../icons/IkonInfotrygd';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';

const ikon = (inntektstype: Inntektstype) => {
    switch (inntektstype) {
        case 'arbeidsgiver':
            return <IkonArbeidsgiver />;
        case 'ytelse':
            return <IkonInfotrygd />;
    }
};

const status = (type: VedtaksperiodeStatus) => {
    switch (type) {
        case VedtaksperiodeStatus.TilUtbetaling:
            return 'tilUtbetaling';
        case VedtaksperiodeStatus.Utbetalt:
            return 'utbetalt';
        case VedtaksperiodeStatus.Venter:
            return 'venter';
        case VedtaksperiodeStatus.Oppgaver:
            return 'oppgaver';
        case VedtaksperiodeStatus.Avslag:
            return 'avslag';
    }
};

const Tidslinjerad = ({ inntektstype, inntektsnavn, vedtaksperioder }: EnkelTidslinje) => {
    const { onSelect, skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    const sortertePerioder = vedtaksperioder
        .map(periode => {
            const { left, width } = kalkulerPosisjonOgBredde(
                isoDato(periode.fom),
                isoDato(periode.tom),
                skalastørrelse,
                sisteDag
            );
            const erAvkuttet = left + width > 100;
            const justertBredde = left + width > 100 ? 100 - left : width;
            return { left, width: justertBredde, value: periode, erAvkuttet };
        })
        .sort((first, second) => first.left - second.left);

    return (
        <div className={classNames('Tidslinjerad', styles.rad)}>
            <p className={styles.inntektskilde}>
                {ikon(inntektstype)}
                {inntektsnavn}
            </p>
            <div className={styles.perioder}>
                <hr />
                {sortertePerioder.map((periode, index) => (
                    <button
                        className={classNames(
                            styles.periode,
                            periode.erAvkuttet && styles.avkuttet,
                            periode.width < 3 && styles.mini,
                            styles[status(periode.value.status)]
                        )}
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
