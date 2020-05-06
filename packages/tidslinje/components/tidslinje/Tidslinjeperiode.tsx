import React, { useEffect, useState } from 'react';
import Tooltip from './Tooltip';
import { EnkelPeriode, Intervall, PosisjonertPeriode } from '../types.internal';
import classNames from 'classnames';
import styles from './Tidslinjerad.less';
import { overlapper } from './calc';

interface TidslinjeperiodeProps {
    periode: PosisjonertPeriode;
    onSelectPeriode?: (periode: EnkelPeriode) => void;
    aktivtIntervall?: Intervall;
}

const ariaLabel = (periode: PosisjonertPeriode): string => {
    const fom = periode.fom.format('DD.MM.YYYY');
    const tom = periode.tom.format('DD.MM.YYYY');
    return `${periode.status} fra ${fom} til og med ${tom}`;
};

const Tidslinjeperiode = ({ periode, onSelectPeriode, aktivtIntervall }: TidslinjeperiodeProps) => {
    const [visEtikett, setVisEtikett] = useState(false);

    const className = classNames(
        styles.periode,
        periode.width < 3 && styles.mini,
        periode.cropped && styles.avkuttet,
        periode.outOfBounds && styles.usynlig,
        periode.sammenheng === 'begge' && styles.sammenhengendeFraBegge,
        periode.sammenheng === 'høyre' && styles.sammenhengendeFraHøyre,
        periode.sammenheng === 'venstre' && styles.sammenhengendeFraVenstre,
        overlapper(periode, aktivtIntervall) && styles.active,
        styles[periode.status],
        periode.className
    );

    const onClick = () => {
        setVisEtikett(!visEtikett);
        onSelectPeriode?.(periode);
    };

    useEffect(() => {
        if (visEtikett) {
            const clickHandler = () => setVisEtikett(false);
            document.addEventListener('click', clickHandler);
            return () => document.removeEventListener('click', clickHandler);
        }
        return () => null;
    }, [visEtikett]);

    return (
        <button
            className={className}
            onClick={onClick}
            aria-label={ariaLabel(periode)}
            tabIndex={-1}
            style={{
                left: `${periode.left}%`,
                width: `${periode.width}%`
            }}
        >
            {periode.etikett && visEtikett && <Tooltip>{periode.etikett}</Tooltip>}
        </button>
    );
};

export default Tidslinjeperiode;
