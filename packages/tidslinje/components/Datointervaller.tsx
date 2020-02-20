import React, { useContext } from 'react';
import { TidslinjeContext } from './Tidslinje';
import { Intervall, Skalastørrelse } from '../types';
import { isoDato, kalkulerPosisjonOgBredde } from '../calc';
import { Dayjs } from 'dayjs';
import styles from './Datointervaller.less';

interface PosisjonertIntervall {
    left: number;
    width: number;
    value: Intervall;
}

const layout = (intervall: Intervall, skalastørrelse: Skalastørrelse, sisteDag: Dayjs) => {
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
    const { onSelect, intervaller, aktivtIntervall, skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    const onClick = (intervall: Intervall) => {
        onSelect(intervall);
    };

    return (
        <div className={styles.container}>
            {intervaller
                .map((intervall: Intervall) => layout(intervall, skalastørrelse, sisteDag))
                .map((intervall: PosisjonertIntervall) => {
                    const className =
                        intervall.value.id === aktivtIntervall?.id ? styles.aktivtDatointervall : styles.datoinvervall;
                    return (
                        <button
                            className={className}
                            key={intervall.value.fom}
                            onClick={() => onClick(intervall.value)}
                            style={{
                                left: `${intervall.left}%`,
                                width: `${intervall.width}%`
                            }}
                            aria-label={`${intervall.value.status} fra ${intervall.value.fom} til og med ${intervall.value.tom}`}
                        />
                    );
                })}
        </div>
    );
};

export default Datointervaller;
