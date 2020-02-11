import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';
import Tidsskala from './Tidsskala';
import Tidslinjerad from './Tidslinjerad';
import Vedtaksperiodevelger from './input/Vedtaksperiodevelger';
import { Footer, TidslinjeContainer, Utsnittsknapp } from './Tidslinje.styles';
import { Rad, StyledVedtaksperiodevelger } from './Tidslinjerad.styles';
import { EnkelTidslinje, Utsnitt, Vedtaksperiode } from './types';

export interface TidslinjeProps {
    tidslinjer: EnkelTidslinje[];
    onSelect: (selected?: Vedtaksperiode) => void;
}

interface TidslinjeContextType {
    utsnitt: Utsnitt;
    onSelect: (selected?: Vedtaksperiode) => void;
}

export const TidslinjeContext = createContext<TidslinjeContextType>({
    onSelect: _ => null,
    utsnitt: Utsnitt.HalvtÅr
});

const Tidslinje = ({ tidslinjer, onSelect }: TidslinjeProps) => {
    const [utsnitt, setUtsnitt] = useState(Utsnitt.HalvtÅr);
    const start = dayjs(0).format('YYYY-MM-DD');
    const sisteDag = tidslinjer.reduce((sisteDag: string, tidslinje: EnkelTidslinje) => {
        const tom = tidslinje.vedtaksperioder.reduce(
            (sisteDag: string, perioden: Vedtaksperiode) => (sisteDag > perioden.tom ? sisteDag : perioden.tom),
            start
        );
        return sisteDag > tom ? sisteDag : tom;
    }, start);

    return (
        <TidslinjeContext.Provider value={{ onSelect, utsnitt }}>
            <TidslinjeContainer>
                <Rad>
                    <StyledVedtaksperiodevelger>
                        <Vedtaksperiodevelger onSelect={onSelect} tidslinjer={tidslinjer} />
                    </StyledVedtaksperiodevelger>
                    <Tidsskala maksDato={sisteDag} />
                </Rad>
                {tidslinjer.map(tidslinje => (
                    <Tidslinjerad key={tidslinje.id} {...tidslinje} maksDato={sisteDag} />
                ))}
                <Footer>
                    <Utsnittsknapp selected={utsnitt === Utsnitt.HalvtÅr} onClick={() => setUtsnitt(Utsnitt.HalvtÅr)}>
                        6 mnd
                    </Utsnittsknapp>
                    <Utsnittsknapp selected={utsnitt === Utsnitt.EttÅr} onClick={() => setUtsnitt(Utsnitt.EttÅr)}>
                        1 år
                    </Utsnittsknapp>
                    <Utsnittsknapp selected={utsnitt === Utsnitt.TreÅr} onClick={() => setUtsnitt(Utsnitt.TreÅr)}>
                        3 år
                    </Utsnittsknapp>
                </Footer>
            </TidslinjeContainer>
        </TidslinjeContext.Provider>
    );
};

export default Tidslinje;
