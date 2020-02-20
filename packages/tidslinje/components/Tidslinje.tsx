import React, { createContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Intervallvelger from './Intervallvelger';
import { EnkelTidslinje, Intervall, Skalastørrelse, Vedtaksperiode } from '../types';
import { isoDato } from '../calc';
import Datointervaller from './Datointervaller';
import styles from './Tidslinje.less';
import Skalaknapp from './Skalaknapp';

export interface TidslinjeProps {
    tidslinjer: EnkelTidslinje[];
    onSelect: (selected?: Intervall) => void;
}

interface TidslinjeContextType {
    sisteDag: Dayjs;
    skalastørrelse: Skalastørrelse;
    onSelect: (selected?: Vedtaksperiode) => void;
    intervaller: Intervall[];
    aktivtIntervall?: Intervall;
}

export const TidslinjeContext = createContext<TidslinjeContextType>({
    onSelect: _ => null,
    sisteDag: dayjs(),
    skalastørrelse: Skalastørrelse.HalvtÅr,
    intervaller: []
});

const sammenlignVedtaksperioder = (first: Vedtaksperiode, second: Vedtaksperiode) => {
    if (first.tom < second.tom) return 1;
    if (first.tom > second.tom) return -1;
    return 0;
};

const Tidslinje = ({ tidslinjer, onSelect }: TidslinjeProps) => {
    const [skalastørrelse, setSkalastørrelse] = useState(Skalastørrelse.HalvtÅr);
    const [aktivtIntervall, setAktivtIntervall] = useState<Intervall>();

    const intervaller = tidslinjer
        .reduce((alleIntervaller: Vedtaksperiode[], tidslinje) => alleIntervaller.concat(tidslinje.vedtaksperioder), [])
        .sort(sammenlignVedtaksperioder);

    const sisteDag = [...intervaller].shift()!.tom;

    const onVelgIntervall = (intervall: Intervall) => {
        setAktivtIntervall(intervall);
        onSelect(intervall);
    };

    return (
        <TidslinjeContext.Provider
            value={{
                onSelect: onVelgIntervall,
                intervaller,
                skalastørrelse,
                sisteDag: isoDato(sisteDag),
                aktivtIntervall
            }}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <Intervallvelger />
                    <Tidsskala />
                </div>
                <div className={styles.tidslinjerader}>
                    {tidslinjer.map(tidslinje => (
                        <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                    ))}
                    <Datointervaller />
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
