import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface SelectProps {
    children: ReactNode | ReactNode[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const selectIcon = `
    pointer-events: none;
    content: '';
    background: #3e3832;
    height: 2px;
    width: 8px;
    border-radius: 10px;
    right: 0.5rem;
    top: 50%;
    z-index: 4;
    position: absolute;
`;

const Wrapper = styled('div')`
    display: flex;
    position: relative;

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
    border-radius: 2px;
    height: 1.375rem;
    padding: 0.125rem 1.125rem 0.125rem 0.125rem;
    background: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
`;

const Select = ({ children, onChange }: SelectProps) => {
    return (
        <Wrapper>
            <StyledSelect onChange={onChange}>{children}</StyledSelect>
        </Wrapper>
    );
};

export default Select;
