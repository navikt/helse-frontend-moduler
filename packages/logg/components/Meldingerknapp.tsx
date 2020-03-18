import React from 'react';
import Filterknapp from './Filterknapp';
import IkonMeldinger from '../icons/IkonMeldinger';

interface MeldingerknappProps {
    onClick: () => void;
    aktiv?: boolean;
    disabled?: boolean;
}

const Meldingerknapp = ({ aktiv, onClick, disabled }: MeldingerknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv} disabled={disabled}>
        <IkonMeldinger />
    </Filterknapp>
);

export default Meldingerknapp;
