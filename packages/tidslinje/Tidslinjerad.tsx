import React, { useContext } from 'react';
import { EnkelTidslinje } from './types';
import { Rad, Inntektskilde, Periode, Perioder } from './Tidslinjerad.styles';
import { kalkulerPosisjonOgBredde } from './calc';
import { TidslinjeContext } from './Tidslinje';

interface TidslinjeradProps extends EnkelTidslinje {
    maksDato: string;
}

const Tidslinjerad = ({ inntektsnavn, vedtaksperioder, maksDato }: TidslinjeradProps) => {
    const { onSelect, utsnitt } = useContext(TidslinjeContext);

    const sortertePerioder = vedtaksperioder
        .map(periode => {
            const { left, width } = kalkulerPosisjonOgBredde(periode.fom, periode.tom, utsnitt, maksDato);
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
                    />
                ))}
            </Perioder>
        </Rad>
    );
};

export default Tidslinjerad;
