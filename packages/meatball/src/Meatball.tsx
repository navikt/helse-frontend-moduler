import React, { CSSProperties } from 'react';
import styles from './Meatball.less';
import classNames from 'classnames';

export interface MeatballProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    style?: CSSProperties;
    size?: 's' | 'l' | number;
    borderColor?: string;
    dotColor?: string;
}

export const Meatball: React.FC<MeatballProps> = React.forwardRef<HTMLButtonElement, MeatballProps>(
    ({ size = 'l', borderColor = '#0067C5', dotColor = '#0067C5', style, className, ...args }: MeatballProps, ref) => {
        const diameter = size === 'l' ? 24 : size === 's' ? 20 : size;

        return (
            <button
                {...args}
                ref={ref}
                className={classNames(styles.meatball_button, className)}
                style={{ ...style, width: diameter, height: diameter }}
            >
                <svg fill="none" viewBox="0 0 20 20" height="20" width="20">
                    <path
                        id="circle_fill"
                        fill="white"
                        d="M 19.19 10 C 19.19 14.952 15.076 18.967 10 18.967 C 4.924 18.967 0.81 14.952 0.81 10 C 0.81 5.048 4.924 1.033 10 1.033 C 15.076 1.033 19.19 5.048 19.19 10 Z"
                    />
                    <path
                        id="outer_circle"
                        fill={`${borderColor}`}
                        d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    />
                    <path
                        id="inner_circle_left"
                        fill={`${dotColor}`}
                        d="M5.81299 11.25C6.50334 11.25 7.06299 10.6904 7.06299 10C7.06299 9.30964 6.50334 8.75 5.81299 8.75C5.12263 8.75 4.56299 9.30964 4.56299 10C4.56299 10.6904 5.12263 11.25 5.81299 11.25Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    />
                    <path
                        id="inner_circle_center"
                        fill={`${dotColor}`}
                        d="M9.97876 11.25C10.6691 11.25 11.2288 10.6904 11.2288 10C11.2288 9.30964 10.6691 8.75 9.97876 8.75C9.2884 8.75 8.72876 9.30964 8.72876 10C8.72876 10.6904 9.2884 11.25 9.97876 11.25Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    />
                    <path
                        id="inner_circle_right"
                        fill={`${dotColor}`}
                        d="M14.1462 11.25C14.8366 11.25 15.3962 10.6904 15.3962 10C15.3962 9.30964 14.8366 8.75 14.1462 8.75C13.4559 8.75 12.8962 9.30964 12.8962 10C12.8962 10.6904 13.4559 11.25 14.1462 11.25Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    />
                </svg>
            </button>
        );
    }
);
