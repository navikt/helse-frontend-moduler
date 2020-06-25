import React, { useContext } from 'react';
import styles from './LoggHeader.less';
import { Filterknapp } from './Filterknapp';
import { LoggContext } from '../LoggContext';

export const LoggHeader = () => {
    const { filtere, aktivtFilter, setAktivtFilter } = useContext(LoggContext);
    return (
        <div className={styles.header}>
            {filtere.map((filter, i) => (
                <Filterknapp
                    key={i}
                    aktiv={aktivtFilter == filter.filterFunction}
                    onClick={() => setAktivtFilter(() => filter.filterFunction)}
                >
                    {filter.renderProp}
                </Filterknapp>
            ))}
        </div>
    );
};
