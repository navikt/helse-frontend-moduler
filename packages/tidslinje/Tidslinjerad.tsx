import React, { useContext } from 'react';
import { EnkelTidslinje } from './types';
import { Rad, Inntektskilde, Periode, Perioder } from './Tidslinjerad.styles';
import { isoDato, kalkulerPosisjonOgBredde } from './calc';
import { TidslinjeContext } from './Tidslinje';

const Tidslinjerad = ({ inntektsnavn, vedtaksperioder }: EnkelTidslinje) => {
    const { onSelect, skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    const sortertePerioder = vedtaksperioder
        .map(periode => {
            const { left, width } = kalkulerPosisjonOgBredde(
                isoDato(periode.fom),
                isoDato(periode.tom),
                skalastørrelse,
                sisteDag
            );
            const erAvkuttet = left + width > 100;
            const justertBredde = left + width > 100 ? 100 - left : width;
            return { left, width: justertBredde, value: periode, erAvkuttet };
        })
        .sort((first, second) => first.left - second.left);

    return (
        <Rad>
            <Inntektskilde>{inntektsnavn}</Inntektskilde>
            <Perioder>
                <hr />
                {sortertePerioder.map((periode, index) => (
                    <Periode
                        key={index}
                        onClick={() => onSelect(periode.value)}
                        status={periode.value.status}
                        avkuttet={periode.erAvkuttet}
                        style={{
                            left: `${periode.left}%`,
                            width: `${periode.width}%`
                        }}
                        aria-label={`${periode.value.status} fra ${periode.value.fom} til og med ${periode.value.tom}`}
                    />
                ))}
            </Perioder>
        </Rad>
    );
};

export default Tidslinjerad;
