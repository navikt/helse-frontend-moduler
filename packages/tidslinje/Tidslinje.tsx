import React, { createContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Vedtaksperiodevelger from './vedtaksperiodevelger/Vedtaksperiodevelger';
import {
    Footer,
    Header,
    TidslinjeContainer,
    Tidslinjerader,
    Utsnittsknapp,
    VedtaksperiodevelgerContainer
} from './Tidslinje.styles';
import { EnkelTidslinje, Skalastørrelse, Vedtaksperiode } from './types';
import { isoDato } from './calc';
import Datointervaller from './Datointervaller';

export interface TidslinjeProps {
    tidslinjer: EnkelTidslinje[];
    onSelect: (selected?: Vedtaksperiode) => void;
}

interface TidslinjeContextType {
    skalastørrelse: Skalastørrelse;
    sisteDag: Dayjs;
    onSelect: (selected?: Vedtaksperiode) => void;
    aktivPeriodeId?: string;
}

export const TidslinjeContext = createContext<TidslinjeContextType>({
    onSelect: _ => null,
    sisteDag: dayjs(),
    skalastørrelse: Skalastørrelse.HalvtÅr
});

const Tidslinje = ({ tidslinjer, onSelect }: TidslinjeProps) => {
    const [aktivPeriodeId, setAktivPeriodeId] = useState<string>();
    const [utsnitt, setUtsnitt] = useState(Skalastørrelse.HalvtÅr);

    const start = dayjs(0).format('YYYY-MM-DD');

    const sisteDag = tidslinjer.reduce((sisteDag: string, tidslinje: EnkelTidslinje) => {
        const tom = tidslinje.vedtaksperioder.reduce(
            (sisteDag: string, perioden: Vedtaksperiode) => (sisteDag > perioden.tom ? sisteDag : perioden.tom),
            start
        );
        return sisteDag > tom ? sisteDag : tom;
    }, start);

    const onVelgAktivVedtaksperiode = (periode: Vedtaksperiode) => {
        setAktivPeriodeId(periode.id);
        onSelect(periode);
    };

    return (
        <TidslinjeContext.Provider
            value={{
                onSelect: onVelgAktivVedtaksperiode,
                aktivPeriodeId,
                skalastørrelse: utsnitt,
                sisteDag: isoDato(sisteDag)
            }}
        >
            <TidslinjeContainer>
                <Header>
                    <VedtaksperiodevelgerContainer>
                        <Vedtaksperiodevelger tidslinjer={tidslinjer} />
                    </VedtaksperiodevelgerContainer>
                    <Tidsskala />
                </Header>
                <Tidslinjerader>
                    {tidslinjer.map(tidslinje => (
                        <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                    ))}
                    <Datointervaller tidslinjer={tidslinjer} />
                </Tidslinjerader>
                <Footer>
                    <Utsnittsknapp
                        selected={utsnitt === Skalastørrelse.HalvtÅr}
                        onClick={() => setUtsnitt(Skalastørrelse.HalvtÅr)}
                    >
                        6 mnd
                    </Utsnittsknapp>
                    <Utsnittsknapp
                        selected={utsnitt === Skalastørrelse.EttÅr}
                        onClick={() => setUtsnitt(Skalastørrelse.EttÅr)}
                    >
                        1 år
                    </Utsnittsknapp>
                    <Utsnittsknapp
                        selected={utsnitt === Skalastørrelse.TreÅr}
                        onClick={() => setUtsnitt(Skalastørrelse.TreÅr)}
                    >
                        3 år
                    </Utsnittsknapp>
                </Footer>
            </TidslinjeContainer>
        </TidslinjeContext.Provider>
    );
};

export default Tidslinje;
