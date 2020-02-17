import React, { useContext } from 'react';
import { Container, Datointervall } from './Datointervaller.styles';
import { TidslinjeContext } from './Tidslinje';
import { Intervall, Skalastørrelse } from './types';
import { isoDato, kalkulerPosisjonOgBredde } from './calc';
import { Dayjs } from 'dayjs';

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
        <Container>
            {intervaller
                .map((intervall: Intervall) => layout(intervall, skalastørrelse, sisteDag))
                .map((intervall: PosisjonertIntervall) => (
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
