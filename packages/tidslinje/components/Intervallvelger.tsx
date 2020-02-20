import React, { useContext } from 'react';
import { TidslinjeContext } from './Tidslinje';
import styles from './Intervallvelger.less';

const Intervallvelger = () => {
    const { onSelect, aktivtIntervall, intervaller } = useContext(TidslinjeContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(intervaller.filter(periode => periode.fom === event.target.value).pop());
    };

    return (
        <div className={styles.container}>
            <div className={styles.selectContainer}>
                <select className={styles.select} onChange={onChange} aria-label="Periode" value={aktivtIntervall?.fom}>
                    {intervaller.map((intervall, index) => {
                        return (
                            <option key={index} value={intervall.fom}>
                                {intervall.fom} - {intervall.tom}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Intervallvelger;
