import React, { useContext } from 'react';
import styles from './LoggHeader.less';
import { Filterknapp } from './Filterknapp';
import { LoggContext } from '../LoggContext';
import classNames from 'classnames';

interface LoggHeaderProps {
    className?: string;
}

export const LoggHeader = ({ className }: LoggHeaderProps) => {
    const { filtere, aktivtFilter, setAktivtFilter } = useContext(LoggContext);
    return (
        <div className={classNames(styles.header, className)}>
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
