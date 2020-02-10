import React from 'react';
import styled from '@emotion/styled';
import { interactiveElement } from './mixins';
import { EnkelTidslinje } from '../types';

interface VedtaksperiodevelgerProps {
    tidslinjer: EnkelTidslinje[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const selectIcon = `
    pointer-events: none;
    content: '';
    background: #3e3832;
    height: 2px;
    width: 8px;
    border-radius: 10px;
    right: 1rem;
    top: 50%;
    z-index: 4;
    position: absolute;
`;

const Wrapper = styled('div')`
    display: flex;
    position: relative;
    margin-right: 2rem;

    &:before {
        ${selectIcon};
        transform: translateX(3px) rotate(-45deg);
    }

    &:after {
        ${selectIcon};
        transform: translateX(-1px) rotate(45deg);
    }
`;

const StyledSelect = styled('select')`
    flex: 1;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    border: 1px solid #78706a;
    border-radius: 3px;
    font-size: 1rem;
    height: 2rem;
    padding: 0.125rem 1.75rem 0.125rem 0.5rem;
    margin: 0.25rem 0;
    background: none;

    ${interactiveElement}
`;

const Vedtaksperiodevelger = ({ tidslinjer, onChange }: VedtaksperiodevelgerProps) => {
    const perioder = tidslinjer.flatMap(tidslinje => tidslinje.vedtaksperioder);

    return (
        <Wrapper>
            <StyledSelect onChange={onChange}>
                {perioder.map((periode, index) => {
                    return (
                        <option key={index}>
                            {periode.fom} - {periode.tom}
                        </option>
                    );
                })}
            </StyledSelect>
        </Wrapper>
    );
};

export default Vedtaksperiodevelger;
