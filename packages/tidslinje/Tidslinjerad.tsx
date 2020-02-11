import React from 'react';
import { EnkelTidslinje, Utsnitt } from './types';
import { Rad, Inntektskilde, Periode, Perioder } from './Tidslinjerad.styles';
import { kalkulerPosisjonOgBredde } from './calc';

interface TidslinjeradProps extends EnkelTidslinje {
    utsnitt: Utsnitt;
    maksDato: string;
}

const Tidslinjerad = ({ inntektstype, inntektsnavn, vedtaksperioder, utsnitt, maksDato }: TidslinjeradProps) => {
    return (
        <Rad>
            <Inntektskilde>{inntektsnavn}</Inntektskilde>
            <Perioder>
                <hr />
                {vedtaksperioder.map((periode, index) => {
                    const { left, width } = kalkulerPosisjonOgBredde(periode.fom, periode.tom, utsnitt, maksDato);
                    const erAvkuttet = left + width > 100;
                    const justertBredde = left + width > 100 ? 100 - left : width;
                    return (
                        <Periode
                            key={index}
                            status={periode.status}
                            avkuttet={erAvkuttet}
                            style={{
                                left: `${left}%`,
                                width: `${justertBredde}%`
                            }}
                        />
                    );
                })}
            </Perioder>
        </Rad>
    );
};

export default Tidslinjerad;
