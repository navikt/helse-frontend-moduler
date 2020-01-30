/** @jsx jsx */
import { Select as NavSelect } from 'nav-frontend-skjema';
import React, { ReactNode } from 'react';
import { selectStyle } from './Select.styles';
import { jsx } from '@emotion/core';

export interface SelectProps {
    children: ReactNode[];
}

const Select = ({ children }: SelectProps) => {
    return <NavSelect css={selectStyle}>{children}</NavSelect>;
};

export default Select;
