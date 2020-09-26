import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';
import { PosisjonertPeriode } from '../types.internal';
import classNames from 'classnames';
import styles from './Tidslinjeperiode.less';

interface TidslinjeperiodeProps {
    periode: PosisjonertPeriode;
    active?: boolean;
    onSelectPeriode?: (periode: PosisjonertPeriode) => void;
}

const ariaLabel = (periode: PosisjonertPeriode): string => {
    const fom = periode.fom.format('DD.MM.YYYY');
    const tom = periode.tom.format('DD.MM.YYYY');
    return `${periode.status} fra ${fom} til og med ${tom}`;
};

const Tidslinjeperiode = React.memo(({ periode, onSelectPeriode, active }: TidslinjeperiodeProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [erMini, setErMini] = useState(false);
    const [visDisabledLabel, setVisDisabledLabel] = useState(false);

    const sammenhengFraHøyre =
        periode.direction === 'left' ? styles.sammenhengendeFraHøyre : styles.sammenhengendeFraVenstre;

    const sammenhengFraVenstre =
        periode.direction === 'left' ? styles.sammenhengendeFraVenstre : styles.sammenhengendeFraHøyre;

    const avkuttet = periode.direction === 'left' ? styles.avkuttetHøyre : styles.avkuttetVenstre;

    const className = classNames(
        styles.periode,
        periode.cropped && avkuttet,
        periode.outOfBounds && styles.usynlig,
        periode.sammenheng === 'begge' && styles.sammenhengendeFraBegge,
        periode.sammenheng === 'høyre' && sammenhengFraHøyre,
        periode.sammenheng === 'venstre' && sammenhengFraVenstre,
        active && styles.active,
        erMini && styles.mini,
        styles[periode.status],
        periode.className
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

    useLayoutEffect(() => {
        const currentWidth = buttonRef.current?.offsetWidth;
        if (currentWidth && currentWidth < 30) {
            setErMini(true);
        }
    }, [buttonRef.current]);

    return (
        <button
            ref={buttonRef}
            className={className}
            onClick={onClick}
            aria-label={ariaLabel(periode)}
            style={{
                [periode.direction]: `${periode.horizontalPosition}%`,
                width: `${periode.width}%`
            }}
        >
            {periode.disabledLabel && visDisabledLabel && <Tooltip>{periode.disabledLabel}</Tooltip>}
        </button>
    );
});

export default Tidslinjeperiode;
