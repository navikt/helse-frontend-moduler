import React from 'react';
import { Dag, Dagtype } from './types';

interface PeriodeContextProps {
    dager: Dag[];
    overstyrer: boolean;
    oppdaterType: (index: number, nyType: Dagtype) => void;
    oppdaterGradering: (index: number, nyGradering: number) => void;
}

const PeriodeContext = React.createContext<PeriodeContextProps>({
    dager: [],
    overstyrer: false,
    oppdaterType: (_index: number, _nyType: Dagtype) => undefined,
    oppdaterGradering: (_index: number, _nyGradering: number) => undefined
});

export default PeriodeContext;
