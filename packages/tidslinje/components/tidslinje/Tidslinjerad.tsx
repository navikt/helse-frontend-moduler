import React from 'react';
import styles from './Tidslinjerad.less';
import classNames from 'classnames';
import { PosisjonertPeriode } from '../types.internal';
import Tidslinjeperiode from './Tidslinjeperiode';

interface TidslinjeradProps {
    perioder: PosisjonertPeriode[];
}

const Tidslinjerad = ({ perioder }: TidslinjeradProps) => (
    <div className={classNames('Tidslinjerad', styles.perioder)}>
        <hr />
        {perioder.map(periode => (
            <Tidslinjeperiode key={periode.id} periode={periode} />
        ))}
    </div>
);

export default Tidslinjerad;
