import React from 'react';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import { PosisjonertPeriode } from '../types.internal';
import Tidslinjeperiode from './Tidslinjeperiode';
import { EnkelPeriode } from '../types.external';

interface TidslinjeradProps {
    perioder: PosisjonertPeriode[];
    onSelectPeriode?: (periode: PosisjonertPeriode) => void;
    erAktiv?: boolean;
}

const Tidslinjerad = ({ perioder, onSelectPeriode, erAktiv = false }: TidslinjeradProps) => (
    <div className={classNames('Tidslinjerad', styles.perioder, erAktiv && styles.aktivRad)}>
        <hr />
        {perioder.map(periode => (
            <Tidslinjeperiode
                key={periode.id}
                periode={periode}
                onSelectPeriode={onSelectPeriode}
                active={periode.active}
            />
        ))}
    </div>
);

export default Tidslinjerad;
