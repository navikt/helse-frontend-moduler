import React from 'react';
import styles from './Progresjonsbar.less';
import classNames from 'classnames';

export interface ProgresjonsbarProps {
    className?: string;
    upperBound: number;
    currentValue: number;
    foregroundColor?: string;
    backgroundColor?: string;
}

const currentValueToPercentage = (currentValue: number, lowerBound: number, upperBound: number) => {
    return currentValue > upperBound ? 100 : currentValue < lowerBound ? 0 : (currentValue / upperBound) * 100;
};

export const Progresjonsbar = ({
    className,
    upperBound,
    currentValue,
    foregroundColor = '#3385D1',
    backgroundColor = '#F8F8F8',
}: ProgresjonsbarProps) => {
    const lowerBound = 0;
    const currentValuePercentage = currentValueToPercentage(currentValue, lowerBound, upperBound);

    return (
        <div
            className={classNames(styles.progresjonsbar, className && className)}
            style={{
                background: `linear-gradient(90deg, ${foregroundColor} ${currentValuePercentage}%, ${backgroundColor} ${currentValuePercentage}%)`,
            }}
        />
    );
};
