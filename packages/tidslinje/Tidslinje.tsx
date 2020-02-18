import React, { createContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Intervallvelger from './intervallvelger/Intervallvelger';
import { Footer, Header, Utsnittsknapp, Tidslinjerader, TidslinjeContainer } from './Tidslinje.styles';
import { EnkelTidslinje, Intervall, Skalastørrelse, Vedtaksperiode } from './types';
import { isoDato } from './calc';
import Datointervaller from './Datointervaller';

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
            <TidslinjeContainer>
                <Header>
                    <Intervallvelger />
                    <Tidsskala />
                </Header>
                <Tidslinjerader>
                    {tidslinjer.map(tidslinje => (
                        <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                    ))}
                    <Datointervaller />
                </Tidslinjerader>
                <Footer>
                    <Utsnittsknapp
                        selected={skalastørrelse === Skalastørrelse.HalvtÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.HalvtÅr)}
                    >
                        6 mnd
                    </Utsnittsknapp>
                    <Utsnittsknapp
                        selected={skalastørrelse === Skalastørrelse.EttÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.EttÅr)}
                    >
                        1 år
                    </Utsnittsknapp>
                    <Utsnittsknapp
                        selected={skalastørrelse === Skalastørrelse.TreÅr}
                        onClick={() => setSkalastørrelse(Skalastørrelse.TreÅr)}
                    >
                        3 år
                    </Utsnittsknapp>
                </Footer>
            </TidslinjeContainer>
        </TidslinjeContext.Provider>
    );
};

export default Tidslinje;
