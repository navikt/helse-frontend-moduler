import React from 'react';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import { EnkelPeriode, Intervall, PosisjonertPeriode } from '../types.internal';
import Tidslinjeperiode from './Tidslinjeperiode';

interface TidslinjeradProps {
    perioder: PosisjonertPeriode[];
    onSelectPeriode: (periode: EnkelPeriode) => void;
    aktivtIntervall?: Intervall;
}

const Tidslinjerad = ({ perioder, onSelectPeriode, aktivtIntervall }: TidslinjeradProps) => (
    <div className={classNames('Tidslinjerad', styles.perioder)}>
        <hr />
        {perioder.map(periode => (
            <Tidslinjeperiode
                key={periode.id}
                periode={periode}
                onSelectPeriode={onSelectPeriode}
                aktivtIntervall={aktivtIntervall}
            />
        ))}
    </div>
);

export default Tidslinjerad;
