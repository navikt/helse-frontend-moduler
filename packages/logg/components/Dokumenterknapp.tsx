import React from 'react';
import Filterknapp from './Filterknapp';
import IkonDokumenter from '../icons/IkonDokumenter';

interface DokumenterknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Dokumenterknapp = ({ aktiv, onClick }: DokumenterknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonDokumenter />
    </Filterknapp>
);

export default Dokumenterknapp;
