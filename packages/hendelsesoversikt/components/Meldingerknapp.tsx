import React from 'react';
import Filterknapp from './Filterknapp';
import IkonMeldinger from '../icons/IkonMeldinger';

interface MeldingerknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Meldingerknapp = ({ aktiv, onClick }: MeldingerknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonMeldinger />
    </Filterknapp>
);

export default Meldingerknapp;
