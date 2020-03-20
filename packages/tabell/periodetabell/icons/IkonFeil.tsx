import React from 'react';
import { IconProps } from './types';

const IkonFeil = ({ color = '#000', width = 17, height = 17 }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width - 1} height={height} viewBox="-1 0 26 26">
            <g stroke={color} strokeLinejoin="round" strokeWidth={2} strokeMiterlimit="10" fill="none">
                <path
                    strokeLinecap="round"
                    d="M22.498 12.31c.105 6.075-4.923 11.086-10.998 11.192-6.074.105-10.893-4.734-10.998-10.81-.106-6.073 4.924-11.085 10.998-11.19 6.074-.106 10.893 4.734 10.998 10.808zM11.5"
                />
                <path
                    transform="translate(-0.5, 0.5)"
                    stroke="none"
                    d="M12 10.651l3.372-3.372a.954.954 0 1 1 1.349 1.35L13.349 12l3.372 3.372a.954.954 0 1 1-1.35 1.349L12 13.349 8.628 16.72a.954.954 0 1 1-1.349-1.35L10.651 12 7.28 8.628A.954.954 0 1 1 8.63 7.28L12 10.651z"
                    fill={color}
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export default IkonFeil;
