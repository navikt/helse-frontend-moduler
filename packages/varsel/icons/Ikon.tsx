import React, { ReactNode } from 'react';
import { IconProps } from './types';

type Children = { children: ReactNode | ReactNode[] };

const Ikon = ({ width = 20, height = 20, children }: IconProps & Children) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
            xmlSpace="preserve"
        >
            {children}
        </svg>
    );
};

export default Ikon;
