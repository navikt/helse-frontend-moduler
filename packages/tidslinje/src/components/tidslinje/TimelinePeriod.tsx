import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './TimelinePeriod.less';
import classNames from 'classnames';
import { Tooltip } from './Tooltip';
import { PositionedPeriod } from '../types.internal';

interface NonClickablePeriodProps {
    period: PositionedPeriod;
    divRef: React.RefObject<HTMLDivElement>;
    className?: string;
}

interface ClickablePeriodProps {
    period: PositionedPeriod;
    buttonRef: React.RefObject<HTMLButtonElement>;
    onSelectPeriod: (period: PositionedPeriod) => void;
    className?: string;
}

interface TimelinePeriodProps {
    period: PositionedPeriod;
    active?: boolean;
    onSelectPeriod?: (period: PositionedPeriod) => void;
}

const ariaLabel = (period: PositionedPeriod): string => {
    const start = period.start.format('DD.MM.YYYY');
    const end = period.endInclusive.format('DD.MM.YYYY');
    return `${period.status} fra ${start} til og med ${end}`;
};

const style = (period: PositionedPeriod): CSSProperties => ({
    [period.direction]: `${period.horizontalPosition}%`,
    width: `${period.width}%`
});

const ClickablePeriod = ({ buttonRef, period, className, onSelectPeriod }: ClickablePeriodProps) => {
    const [showDisabledLabel, setShowDisabledLabel] = useState(false);

    const onClick = () => {
        if (period.disabledLabel) {
            setShowDisabledLabel(!showDisabledLabel);
        } else {
            onSelectPeriod?.(period);
        }
    };

    useEffect(() => {
        if (showDisabledLabel) {
            const clickHandler = () => setShowDisabledLabel(false);
            document.addEventListener('click', clickHandler);
            return () => document.removeEventListener('click', clickHandler);
        }
        return () => null;
    }, [showDisabledLabel]);

    return (
        <button
            ref={buttonRef}
            className={className}
            onClick={onClick}
            aria-label={ariaLabel(period)}
            style={style(period)}
        >
            {period.disabledLabel && showDisabledLabel && <Tooltip>{period.disabledLabel}</Tooltip>}
        </button>
    );
};

const NonClickablePeriod = ({ divRef, period, className }: NonClickablePeriodProps) => (
    <div ref={divRef} className={className} aria-label={ariaLabel(period)} style={style(period)} />
);

export const TimelinePeriod = React.memo(({ period, onSelectPeriod, active }: TimelinePeriodProps) => {
    const ref = useRef<any>(null);
    const [isMini, setIsMini] = useState(false);

    const className = classNames(
        'periode',
        styles.periode,
        period.cropped === 'both' && styles.sammenhengendeFraBegge,
        period.cropped === 'right' &&
            (period.direction === 'left' ? styles.sammenhengendeFraHøyre : styles.sammenhengendeFraVenstre),
        period.cropped === 'left' &&
            (period.direction === 'left' ? styles.sammenhengendeFraVenstre : styles.sammenhengendeFraHøyre),
        active && styles.active,
        isMini && styles.mini,
        styles[period.status],
        period.className
    );

    useLayoutEffect(() => {
        const currentWidth = ref.current?.offsetWidth;
        if (currentWidth && currentWidth < 30) {
            setIsMini(true);
        }
    }, [ref.current]);

    useEffect(() => {
        if (active) ref.current?.focus();
    }, [active]);

    return onSelectPeriod ? (
        <ClickablePeriod buttonRef={ref} period={period} onSelectPeriod={onSelectPeriod} className={className} />
    ) : (
        <NonClickablePeriod divRef={ref} period={period} className={className} />
    );
});
