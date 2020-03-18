import React from 'react';
import styles from './Logg.less';
import { Hendelse } from './types';
import classNames from 'classnames';
import LoggHeader from './components/LoggHeader';
import LoggProvider from './LoggContext';
import Loggvisning from './components/Loggvisning';

export interface LoggProps {
    className?: string;
    hendelser?: Hendelse[];
}

const Logg = ({ hendelser, className }: LoggProps) => (
    <div className={classNames(styles.container, className)}>
        <LoggProvider hendelser={hendelser}>
            <LoggHeader />
            <Loggvisning />
        </LoggProvider>
    </div>
);

export default Logg;
