import React from 'react';
import Filterknapp from './Filterknapp';
import IkonHistorikk from '../icons/IkonHistorikk';

interface HistorikkknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Historikkknapp = ({ aktiv, onClick }: HistorikkknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonHistorikk />
    </Filterknapp>
);

export default Historikkknapp;
