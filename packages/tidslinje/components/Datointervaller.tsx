import React, { useContext } from 'react';
import { TidslinjeContext } from './Tidslinje';
import { Intervall, Skalastørrelse } from '../types';
import { isoDato, kalkulerPosisjonOgBredde } from '../calc';
import styles from './Datointervaller.less';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';

interface PosisjonertIntervall {
    left: number;
    width: number;
    value: Intervall;
    erUtenforSynligTidslinje: boolean;
}

const tilPosisjonertIntervall = (
    intervall: Intervall,
    skalastørrelse: Skalastørrelse,
    sisteDag: Dayjs
): PosisjonertIntervall => {
    const { left, width } = kalkulerPosisjonOgBredde(
        isoDato(intervall.fom),
        isoDato(intervall.tom),
        skalastørrelse,
        sisteDag
    );
    const justertBredde = left + width > 100 ? 100 - left : width;
    const erUtenforSynligTidslinje = left >= 100;
    return { left, width: justertBredde, value: intervall, erUtenforSynligTidslinje };
};

const duplikatintervall = (intervallet: PosisjonertIntervall, i: number, alleIntervaller: PosisjonertIntervall[]) =>
    !alleIntervaller
        .slice(i + 1)
        .find(other => other.value.fom === intervallet.value.fom && other.value.tom === intervallet.value.tom);

const utenforTidslinje = (intervallet: PosisjonertIntervall) => !intervallet.erUtenforSynligTidslinje;

const Datointervaller = () => {
    const { intervaller, aktivtIntervall, onFocus, onSelect, skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    const posisjonerteIntervaller = intervaller
        .map(intervall => tilPosisjonertIntervall(intervall, skalastørrelse, sisteDag))
        .filter(utenforTidslinje)
        .filter(duplikatintervall)
        .map(posisjonertIntervall => {
            const className =
                posisjonertIntervall.value.id === aktivtIntervall?.id
                    ? styles.aktivtDatointervall
                    : styles.datoinvervall;
            return (
                <button
                    className={classNames(className)}
                    key={posisjonertIntervall.value.fom}
                    style={{
                        left: `${posisjonertIntervall.left}%`,
                        width: `${posisjonertIntervall.width}%`
                    }}
                    onClick={() => onSelect(posisjonertIntervall.value)}
                    onFocus={() => onFocus(posisjonertIntervall.value)}
                    onBlur={() => onFocus(undefined)}
                    tabIndex={0}
                    disabled={posisjonertIntervall.value.disabled}
                    aria-label={`${posisjonertIntervall.value.status} fra ${posisjonertIntervall.value.fom} til og med ${posisjonertIntervall.value.tom}`}
                />
            );
        });

    return <div className={styles.container}>{posisjonerteIntervaller}</div>;
};

export default Datointervaller;
