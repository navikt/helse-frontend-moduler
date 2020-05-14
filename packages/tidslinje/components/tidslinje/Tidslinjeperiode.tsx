import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tooltip from './Tooltip';
import { PosisjonertPeriode } from '../types.internal';
import classNames from 'classnames';
import styles from './Tidslinjeperiode.less';
import { overlapper } from './calc';
import { TidslinjeContext } from './Tidslinje';

interface TidslinjeperiodeProps {
    periode: PosisjonertPeriode;
}

const ariaLabel = (periode: PosisjonertPeriode): string => {
    const fom = periode.fom.format('DD.MM.YYYY');
    const tom = periode.tom.format('DD.MM.YYYY');
    return `${periode.status} fra ${fom} til og med ${tom}`;
};

const Tidslinjeperiode = ({ periode }: TidslinjeperiodeProps) => {
    const { onSelectPeriode, aktivtIntervall, timelinePixelWidth } = useContext(TidslinjeContext);
    const [visDisabledLabel, setVisDisabledLabel] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const relativeWidth = timelinePixelWidth ? (timelinePixelWidth / 100) * periode.width : Number.MAX_SAFE_INTEGER;

    const className = useMemo(
        () =>
            classNames(
                styles.periode,
                relativeWidth < 30 && styles.mini,
                periode.cropped && styles.avkuttet,
                periode.outOfBounds && styles.usynlig,
                periode.sammenheng === 'begge' && styles.sammenhengendeFraBegge,
                periode.sammenheng === 'høyre' && styles.sammenhengendeFraHøyre,
                periode.sammenheng === 'venstre' && styles.sammenhengendeFraVenstre,
                overlapper(periode, aktivtIntervall) && styles.active,
                styles[periode.status],
                periode.className
            ),
        [aktivtIntervall, timelinePixelWidth]
    );

    const onClick = () => {
        if (periode.disabledLabel) {
            setVisDisabledLabel(!visDisabledLabel);
        } else {
            onSelectPeriode?.(periode);
        }
    };

    useEffect(() => {
        if (visDisabledLabel) {
            const clickHandler = () => setVisDisabledLabel(false);
            document.addEventListener('click', clickHandler);
            return () => document.removeEventListener('click', clickHandler);
        }
        return () => null;
    }, [visDisabledLabel]);

    return (
        <button
            className={className}
            onClick={onClick}
            aria-label={ariaLabel(periode)}
            tabIndex={-1}
            ref={buttonRef}
            style={{
                left: `${periode.left}%`,
                width: `${periode.width}%`
            }}
        >
            {periode.disabledLabel && visDisabledLabel && <Tooltip>{periode.disabledLabel}</Tooltip>}
        </button>
    );
};

export default Tidslinjeperiode;
