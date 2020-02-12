import * as React from 'react';
import { IconProps } from './types';

const IkonEgenmelding = ({ color = '#b7b1a9', width = 16, height = 16 }: IconProps) => {
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
            <g fill={color}>
                <path d="M19.5,3H17v17H6V3H3.5C3.224,3,3,3.224,3,3.5v20C3,23.776,3.224,24,3.5,24h16c0.276,0,0.5-0.224,0.5-0.5v-20 C20,3.224,19.776,3,19.5,3z" />
                <path d="M7.5,7h8C15.776,7,16,6.776,16,6.5v-4C16,2.224,15.776,2,15.5,2h-1.55c-0.232-1.141-1.271-2-2.45-2 c-1.184,0-2.219,0.863-2.45,2H7.5C7.224,2,7,2.224,7,2.5v4C7,6.776,7.224,7,7.5,7z" />
            </g>
        </svg>
    );
};

export default IkonEgenmelding;