import React from 'react';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import { PosisjonertPeriode } from '../types.internal';
import Tidslinjeperiode from './Tidslinjeperiode';
import { EnkelPeriode } from '../types.external';

interface TidslinjeradProps {
    perioder: PosisjonertPeriode[];
    aktivPeriode?: EnkelPeriode;
    onSelectPeriode?: (periode: PosisjonertPeriode) => void;
}

const Tidslinjerad = ({ perioder, onSelectPeriode, aktivPeriode }: TidslinjeradProps) => (
    <div className={classNames('Tidslinjerad', styles.perioder)}>
        <hr />
        {perioder.map(periode => (
            <Tidslinjeperiode
                key={periode.id}
                periode={periode}
                onSelectPeriode={onSelectPeriode}
                active={
                    (aktivPeriode &&
                        aktivPeriode.tom.getTime() === periode.tom.toDate().getTime() &&
                        aktivPeriode.fom.getTime() === periode.fom.toDate().getTime()) ??
                    false
                }
            />
        ))}
    </div>
);

export default Tidslinjerad;
