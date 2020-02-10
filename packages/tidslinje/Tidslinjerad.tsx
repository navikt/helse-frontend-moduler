import React from 'react';
import { EnkelTidslinje, Utsnitt } from './types';
import { Rad, Inntektskilde, Periode, Perioder } from './Tidslinjerad.styles';
import { kalkulerPosisjonOgBredde, dagerIUtsnitt } from './calc';

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
                    const { right, width } = kalkulerPosisjonOgBredde(
                        periode.fom,
                        periode.tom,
                        dagerIUtsnitt(utsnitt, maksDato),
                        maksDato
                    );
                    return (
                        <Periode
                            key={index}
                            status={periode.status}
                            style={{
                                right: `${right}%`,
                                width: `${width}%`
                            }}
                        />
                    );
                })}
            </Perioder>
        </Rad>
    );
};

export default Tidslinjerad;
