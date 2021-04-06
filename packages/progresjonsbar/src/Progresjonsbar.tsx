import React from 'react';
import styles from './Progresjonsbar.less';
import classNames from 'classnames';

export interface ProgresjonsbarProps {
    upperBound: number;
    currentValue: number;
    foreground: string;
    background: string;
}

const currentValueToPercentage = (currentValue: number, lowerBound: number, upperBound: number) => {
    return currentValue > upperBound ? 100 : currentValue < lowerBound ? 0 : (currentValue / upperBound) * 100;
};

export const Progresjonsbar = ({
    upperBound,
    currentValue,
    foreground = '#3385D1',
    background = '#F8F8F8',
}: ProgresjonsbarProps) => {
    const lowerBound = 0;
    const currentValuePercentage = currentValueToPercentage(currentValue, lowerBound, upperBound);

    return (
        <div
            className={classNames(styles.progresjonsbar)}
            style={{
                background: `linear-gradient(90deg, ${foreground} ${currentValuePercentage}%, ${background} ${currentValuePercentage}%)`,
            }}
        />
    );
};
