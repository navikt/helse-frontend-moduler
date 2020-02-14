import React from 'react';
import Ikon, { IkonProps } from './Ikon';

const IkonInfotrygd = ({ height = 16, width = 16, viewBox = 16, ...rest }: IkonProps) => {
    return (
        <Ikon height={16} width={16} viewBox={16} {...rest}>
            <g
                xmlns="http://www.w3.org/2000/svg"
                id="infotrygd"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g id="Fill/32-content/box-4" fill="#78706A">
                    <path
                        d="M16,3.03799998 L16,12.3813334 L15.776,12.6966667 L8,15.2853334 L8,5.29733332 L16,3.03799998 Z M-3.33333444e-08,3.13133331 L7.33333333,5.30066666 L7.33333333,15.2853334 L0.223999968,12.6966667 L-3.33333444e-08,12.3813334 L-3.33333444e-08,3.13133331 Z M8.028,0.715999969 L8.084,0.725333303 L15.194,2.58066664 L7.68666667,4.69466665 L7.68666667,4.69466665 L7.66666667,4.68999999 C7.658,4.68999999 7.65133333,4.69399999 7.64333333,4.69533332 L7.64333333,4.69533332 L0.647999969,2.62199998 L7.916,0.725333303 C7.97066667,0.711333303 8.02866667,0.711333303 8.084,0.725333303 Z"
                        id="Combined-Shape"
                    />
                </g>
            </g>
        </Ikon>
    );
};

export default IkonInfotrygd;
