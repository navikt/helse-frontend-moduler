import React from 'react';
import Ikon from './Ikon';
import { IconProps } from './types';

const IkonAdvarsel = ({ fill = '#ffa733', stroke = '#3E3832', width = 20, height = 20 }: IconProps) => {
    return (
        <Ikon width={width} height={height}>
            <path
                d="M12.205-.004l-.214.002a12.225 12.225 0 0 0-8.517 3.659C1.179 5.977-.053 9.013.002 12.208c.115 6.613 5.296 11.793 11.795 11.793l.212-.002c6.726-.116 12.105-5.595 11.99-12.21C23.883 5.178 18.702-.003 12.204-.003z"
                fill={fill}
                fillRule="nonzero"
            />
            <path d="M12.027 19H12A1.499 1.499 0 0 1 11.973 16L12 16a1.501 1.501 0 0 1 .027 3z" fill={stroke} />
            <path d="M12 5a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z" fill={stroke} fillRule="nonzero" />
        </Ikon>
    );
};

export default IkonAdvarsel;
