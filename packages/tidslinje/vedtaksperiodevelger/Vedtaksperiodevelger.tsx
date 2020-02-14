import React, { useContext } from 'react';
import { EnkelTidslinje } from '../types';
import { TidslinjeContext } from '../Tidslinje';
import { StyledSelect, Wrapper } from './Vedtaksperiodevelger.styles';

interface VedtaksperiodevelgerProps {
    tidslinjer: EnkelTidslinje[];
}

const Vedtaksperiodevelger = ({ tidslinjer }: VedtaksperiodevelgerProps) => {
    const { onSelect, aktivPeriodeId } = useContext(TidslinjeContext);
    const perioder = tidslinjer.flatMap(tidslinje => tidslinje.vedtaksperioder);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
        onSelect(perioder.filter(periode => periode.id === event.target.value).pop());

    return (
        <Wrapper>
            <StyledSelect onChange={onChange} aria-label="Periode">
                {perioder.map((periode, index) => {
                    return (
                        <option
                            key={index}
                            value={periode.id}
                            {...(periode.id === aktivPeriodeId && { selected: true })}
                        >
                            {periode.fom} - {periode.tom}
                        </option>
                    );
                })}
            </StyledSelect>
        </Wrapper>
    );
};

export default Vedtaksperiodevelger;
