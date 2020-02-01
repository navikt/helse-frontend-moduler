import React from 'react';
import Ikon from './Ikon';
import { IconProps } from './types';

const IkonÅpen = ({ color = '#0067c5', width = 24, height = 32 }: IconProps) => {
    return (
        <Ikon width={width} height={height}>
            <path
                fill={color}
                d="M3,9v15h18V9h-3V6c0-3.309-2.692-6-6-6C8.691,0,6,2.691,6,6h1c0-2.758,2.242-5,5-5c2.757,0,5,2.242,5,5v3H3z M11,15 c0-0.553,0.448-1,1-1c0.551,0,1,0.447,1,1c0,0.367-0.203,0.688-0.5,0.859V18.5c0,0.275-0.225,0.5-0.5,0.5 c-0.276,0-0.5-0.225-0.5-0.5v-2.641C11.202,15.688,11,15.367,11,15z"
            />
        </Ikon>
    );
};

export default IkonÅpen;
