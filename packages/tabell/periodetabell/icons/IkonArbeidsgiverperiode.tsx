import React from 'react';
import Ikon from './Ikon';

interface IkonArbeidsgiverperiodeProps {
    color?: string;
    width?: number;
    height?: number;
}

const IkonArbeidsgiverperiode = ({ color = '#78706A' }: IkonArbeidsgiverperiodeProps) => {
    return (
        <Ikon>
            <g transform="translate(3 7)" fill={color} fillRule="evenodd">
                <circle cx="2" cy="4.667" r="2" />
                <path d="M3 4.167h10v1H3z" />
                <path d="M17.667 4.667l-5.334 4v-8z" />
            </g>
        </Ikon>
    );
};

export default IkonArbeidsgiverperiode;
