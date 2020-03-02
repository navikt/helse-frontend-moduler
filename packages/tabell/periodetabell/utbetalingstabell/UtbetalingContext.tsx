import React from 'react';
import { Dag, Dagtype } from '../types';

interface UtbetalingContextProps {
    dager: Dag[];
    overstyrer: boolean;
    oppdaterType: (index: number, nyType: Dagtype) => void;
    oppdaterGradering: (index: number, nyGradering: number) => void;
    oppdaterUtbetaling: (index: number, nyUtbetaling: number) => void;
}

const UtbetalingContext = React.createContext<UtbetalingContextProps>({
    dager: [],
    overstyrer: false,
    oppdaterType: (_index: number, _nyType: Dagtype) => undefined,
    oppdaterGradering: (_index: number, _nyGradering: number) => undefined,
    oppdaterUtbetaling: (_index: number, _nyUtbetaling: number) => undefined
});

export default UtbetalingContext;
