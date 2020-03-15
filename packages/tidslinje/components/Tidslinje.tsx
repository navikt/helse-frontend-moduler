import React, { createContext, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Intervallvelger from './Intervallvelger';
import { EnkelTidslinje, Intervall, Skalastørrelse, Vedtaksperiode } from '../types';
import { isoDato } from '../calc';
import Datointervaller from './Datointervaller';
import styles from './Tidslinje.less';
import Skalaknapp from './Skalaknapp';
import classNames from 'classnames';

export interface TidslinjeProps {
    tidslinjer: EnkelTidslinje[];
    onSelect: (selected?: Intervall) => void;
    className?: string;
}

interface TidslinjeContextType {
    sisteDag: Dayjs;
    skalastørrelse: Skalastørrelse;
    onSelect: (selected?: Intervall) => void;
    onFocus: (focused?: Intervall) => void;
    intervaller: Intervall[];
    aktivtIntervall?: Intervall;
    intervallMedFokus?: Intervall;
}

export const TidslinjeContext = createContext<TidslinjeContextType>({
    onSelect: _ => null,
    onFocus: _ => null,
    sisteDag: dayjs(),
    skalastørrelse: Skalastørrelse.HalvtÅr,
    intervaller: []
});

const sammenlignVedtaksperioder = (first: Vedtaksperiode, second: Vedtaksperiode) => {
    if (first.tom < second.tom) return 1;
    if (first.tom > second.tom) return -1;
    return 0;
};

/**
 * Sammensatt tidslinje av én eller flere enkelttidslinjer for å lett kunne se og fatte vedtak på perioder på tvers av
 * tidslinjer. Tidslinjene går fra nyeste til eldste dato, venstre til høyre, og det er den nyeste perioden som velges
 * by default ved mount av komponenten.
 */
const Tidslinje = ({ tidslinjer, onSelect, className }: TidslinjeProps) => {
    const [skalastørrelse, setSkalastørrelse] = useState(Skalastørrelse.HalvtÅr);
    const [aktivtIntervall, setAktivtIntervall] = useState<Intervall>();
    const [intervallMedFokus, setIntervallMedFokus] = useState<Intervall>();

    const intervaller = tidslinjer.flatMap(tidslinje => tidslinje.vedtaksperioder).sort(sammenlignVedtaksperioder);

    const sisteDag = [...intervaller].shift()!.tom;

    const onVelgIntervall = (intervall: Intervall) => {
        if (intervall.disabled) return;
        setAktivtIntervall(intervall);
        onSelect(intervall);
    };

    const onFokusérIntervall = (intervall: Intervall) => {
        setIntervallMedFokus(intervall);
    };

    useEffect(() => {
        const førsteGyldigeIntervall = intervaller.find(intervall => !intervall.disabled);
        setAktivtIntervall(førsteGyldigeIntervall);
    }, []);

    return (
        <TidslinjeContext.Provider
            value={{
                onSelect: onVelgIntervall,
                onFocus: onFokusérIntervall,
                intervaller,
                skalastørrelse,
                sisteDag: isoDato(sisteDag),
                aktivtIntervall,
                intervallMedFokus
            }}
        >
            <div className={classNames(styles.container, className)}>
                <div className={styles.header}>
                    <Intervallvelger />
                    <Tidsskala />
                </div>
                <div className={styles.tidslinjerader}>
                    <Datointervaller />
                    {tidslinjer.map(tidslinje => (
                        <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                    ))}
                </div>
                <div className={styles.footer}>
                    <Skalaknapp
                        selected={skalastørrelse === Skalastørrelse.HalvtÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.HalvtÅr)}
                    >
                        6 mnd
                    </Skalaknapp>
                    <Skalaknapp
                        selected={skalastørrelse === Skalastørrelse.EttÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.EttÅr)}
                    >
                        1 år
                    </Skalaknapp>
                    <Skalaknapp
                        selected={skalastørrelse === Skalastørrelse.TreÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.TreÅr)}
                    >
                        3 år
                    </Skalaknapp>
                </div>
            </div>
        </TidslinjeContext.Provider>
    );
};

export default Tidslinje;
