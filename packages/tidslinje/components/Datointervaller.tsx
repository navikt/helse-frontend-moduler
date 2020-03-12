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
    return { left, width: justertBredde, value: intervall };
};

const Datointervaller = () => {
    const { onSelect, intervaller, aktivtIntervall, skalastørrelse, sisteDag } = useContext(
        TidslinjeContext
    );

    const onClick = (intervall: Intervall) => onSelect(intervall);

    const posisjonerteIntervaller = intervaller
        .map(intervall => tilPosisjonertIntervall(intervall, skalastørrelse, sisteDag))
        .map(posisjonertIntervall => {
            const className =
                posisjonertIntervall.value.id === aktivtIntervall?.id
                    ? styles.aktivtDatointervall
                    : styles.datoinvervall;
            return (
                <button
                    className={classNames(className)}
                    key={posisjonertIntervall.value.fom}
                    onClick={() => onClick(posisjonertIntervall.value)}
                    style={{
                        left: `${posisjonertIntervall.left}%`,
                        width: `${posisjonertIntervall.width}%`
                    }}
                    disabled={posisjonertIntervall.value.disabled}
                    aria-label={`${posisjonertIntervall.value.status} fra ${posisjonertIntervall.value.fom} til og med ${posisjonertIntervall.value.tom}`}
                />
            );
        });

    return <div className={styles.container}>{posisjonerteIntervaller}</div>;
};

export default Datointervaller;
