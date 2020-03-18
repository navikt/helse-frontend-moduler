import React, { ReactNode, useState } from 'react';
import { Hendelse, Hendelsetype } from './types';

interface LoggContextType {
    hendelser?: Hendelse[];
    aktivtFilter: Hendelsetype;
    setAktivtFilter: (type: Hendelsetype) => void;
}

export const LoggContext = React.createContext<LoggContextType>({
    hendelser: [],
    aktivtFilter: Hendelsetype.Historikk,
    setAktivtFilter: _ => null
});

interface LoggProviderProps {
    hendelser?: Hendelse[];
    children: ReactNode | ReactNode[];
}

const LoggProvider = ({ hendelser, children }: LoggProviderProps) => {
    const [aktivtFilter, setAktivtFilter] = useState(Hendelsetype.Historikk);

    return (
        <LoggContext.Provider
            value={{
                hendelser,
                aktivtFilter,
                setAktivtFilter
            }}
        >
            {children}
        </LoggContext.Provider>
    );
};

export default LoggProvider;
