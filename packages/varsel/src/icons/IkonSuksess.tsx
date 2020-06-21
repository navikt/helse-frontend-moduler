import React from 'react';
import { IconProps } from './types';
import Ikon from './Ikon';

const IkonSuksess = ({ fill = '#1c6937', stroke = '#ffffff', width, height }: IconProps) => {
    return (
        <Ikon height={height} width={width}>
            <path d="M12 0C5.383 0 0 5.384 0 12s5.383 12 12 12c6.616 0 12-5.384 12-12S18.616 0 12 0z" fill={fill} />
            <path
                d="M9.64 14.441l6.46-5.839a.997.997 0 0 1 1.376.044.923.923 0 0 1-.046 1.334l-7.15 6.464a.993.993 0 0 1-.662.252.992.992 0 0 1-.69-.276l-2.382-2.308a.923.923 0 0 1 0-1.334.997.997 0 0 1 1.377 0l1.717 1.663z"
                fill={stroke}
            />
        </Ikon>
    );
};

export default IkonSuksess;
