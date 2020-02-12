import React, { createContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Vedtaksperiodevelger from './input/Vedtaksperiodevelger';
import { Footer, TidslinjeContainer, Utsnittsknapp } from './Tidslinje.styles';
import { Rad, StyledVedtaksperiodevelger } from './Tidslinjerad.styles';
import { EnkelTidslinje, Skalastørrelse, Vedtaksperiode } from './types';
import { isoDato } from './calc';

export interface TidslinjeProps {
    tidslinjer: EnkelTidslinje[];
    onSelect: (selected?: Vedtaksperiode) => void;
}

interface TidslinjeContextType {
    skalastørrelse: Skalastørrelse;
    sisteDag: Dayjs;
    onSelect: (selected?: Vedtaksperiode) => void;
}

export const TidslinjeContext = createContext<TidslinjeContextType>({
    onSelect: _ => null,
    sisteDag: dayjs(),
    skalastørrelse: Skalastørrelse.HalvtÅr
});

const Tidslinje = ({ tidslinjer, onSelect }: TidslinjeProps) => {
    const [utsnitt, setUtsnitt] = useState(Skalastørrelse.HalvtÅr);
    const start = dayjs(0).format('YYYY-MM-DD');
    const sisteDag = tidslinjer.reduce((sisteDag: string, tidslinje: EnkelTidslinje) => {
        const tom = tidslinje.vedtaksperioder.reduce(
            (sisteDag: string, perioden: Vedtaksperiode) => (sisteDag > perioden.tom ? sisteDag : perioden.tom),
            start
        );
        return sisteDag > tom ? sisteDag : tom;
    }, start);

    return (
        <TidslinjeContext.Provider value={{ onSelect, skalastørrelse: utsnitt, sisteDag: isoDato(sisteDag) }}>
            <TidslinjeContainer>
                <Rad>
                    <StyledVedtaksperiodevelger>
                        <Vedtaksperiodevelger onSelect={onSelect} tidslinjer={tidslinjer} />
                    </StyledVedtaksperiodevelger>
                    <Tidsskala />
                </Rad>
                {tidslinjer.map(tidslinje => (
                    <Tidslinjerad key={tidslinje.id} {...tidslinje} />
                ))}
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
