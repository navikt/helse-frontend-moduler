import React, { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { Filter, Hendelse, Hendelsefilter, HendelseMedId, Hendelsetype } from './types';
import { nanoid } from 'nanoid';

interface LoggContextType {
    filtere: Filter[];
    hendelser: HendelseMedId[];
    aktivtFilter: Hendelsefilter;
    setAktivtFilter: Dispatch<SetStateAction<Hendelsefilter>>;
}

export const LoggContext = React.createContext<LoggContextType>({
    filtere: [],
    hendelser: [],
    aktivtFilter: (_: Hendelse) => true,
    setAktivtFilter: _ => null
});

const MemoizedChildrenWrapper = React.memo(({ children }: { children: ReactNode | ReactNode[] }) => <>{children}</>);

interface LoggProviderProps<T> {
    hendelser: Hendelse[];
    filtere: Filter[];
    children: ReactNode | ReactNode[];
}

export const LoggProvider = ({ hendelser, filtere, children }: LoggProviderProps<Hendelsetype>) => {
    const hendelserMedId = useMemo(
        () =>
            hendelser.map(hendelse => ({
                ...hendelse,
                id: nanoid()
            })),
        [hendelser]
    );
    const [aktivtFilter, setAktivtFilter] = useState(() => filtere[0].filterFunction);

    return (
        <LoggContext.Provider
            value={{
                filtere,
                hendelser: hendelserMedId,
                aktivtFilter,
                setAktivtFilter
            }}
        >
            <MemoizedChildrenWrapper>{children}</MemoizedChildrenWrapper>
        </LoggContext.Provider>
    );
};
