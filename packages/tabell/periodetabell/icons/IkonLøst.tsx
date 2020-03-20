import { IconProps } from './types';
import React from 'react';

const IkonLøst = ({ color = '#000', width = 17, height = 17 }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={width - 1}
        height={height}
        viewBox="-1 -1 26 24"
        enableBackground="new 0 0 24 24"
        xmlSpace="preserve"
    >
        <g
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
        >
            <path d="M17,8.5l-7.5,7L7,13" />
            <circle cx="12" cy="12" r="11.5" />
        </g>
    </svg>
);

export default IkonLøst;
