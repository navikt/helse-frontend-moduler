import React, { useContext, useState } from 'react';
import { EnkelTidslinje, Vedtaksperiode } from './types';
import { Container, Datointervall } from './Datointervaller.styles';
import { isoDato, kalkulerPosisjonOgBredde } from './calc';
import { TidslinjeContext } from './Tidslinje';

interface Datointervaller {
    tidslinjer: EnkelTidslinje[];
}

type Intervall = Vedtaksperiode;

const sammenlignVedtaksperioder = (first: Vedtaksperiode, second: Vedtaksperiode) => {
    if (first.tom < second.tom) return -1;
    if (first.tom > second.tom) return 1;
    return 0;
};

const Datointervaller = ({ tidslinjer }: Datointervaller) => {
    const { onSelect, skalastørrelse, sisteDag } = useContext(TidslinjeContext);
    const [aktivtIntervall, setAktivtIntervall] = useState<Intervall>();

    const intervaller = tidslinjer
        .reduce((alleIntervaller: Vedtaksperiode[], tidslinje) => alleIntervaller.concat(tidslinje.vedtaksperioder), [])
        .sort(sammenlignVedtaksperioder)
        .map(intervall => {
            const { left, width } = kalkulerPosisjonOgBredde(
                isoDato(intervall.fom),
                isoDato(intervall.tom),
                skalastørrelse,
                sisteDag
            );
            const justertBredde = left + width > 100 ? 100 - left : width;
            return { left, width: justertBredde, value: intervall };
        });

    const onClick = (intervall: Intervall) => {
        setAktivtIntervall(intervall);
        onSelect(intervall);
    };

    return (
        <Container>
            {intervaller.map(intervall => (
                <Datointervall
                    onClick={() => onClick(intervall.value)}
                    key={intervall.value.fom}
                    posisjonFraVenstre={intervall.left}
                    bredde={intervall.width}
                    aktiv={intervall.value.id === aktivtIntervall?.id}
                    aria-label={`${intervall.value.status} fra ${intervall.value.fom} til og med ${intervall.value.tom}`}
                />
            ))}
        </Container>
    );
};

export default Datointervaller;
