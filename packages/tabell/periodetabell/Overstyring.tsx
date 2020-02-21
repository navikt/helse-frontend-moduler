import React from 'react';
import IkonÅpen from './icons/IkonÅpen';
import IkonLåst from './icons/IkonLåst';
import styles from './Overstyring.less';

interface OverstyringProps {
    åpen: boolean;
    onOverstyring: () => void;
}

const Overstyring = ({ åpen, onOverstyring }: OverstyringProps) => {
    return (
        <button className={styles.knapp} onClick={onOverstyring}>
            {åpen ? <IkonÅpen /> : <IkonLåst />}
            {åpen ? <p>Lukk</p> : <p>Overstyre</p>}
        </button>
    );
};

export default Overstyring;
