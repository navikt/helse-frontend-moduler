import React from 'react';
import IkonÅpen from './icons/IkonÅpen';
import IkonLåst from './icons/IkonLåst';
import styled from '@emotion/styled';

interface OverstyringProps {
    åpen: boolean;
    onOverstyring: () => void;
}

const Overstyringsknapp = styled('button')`
    border: none;
    color: #0067c5;
    background: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    transition: all 0.2s;
    width: max-content;

    > p {
        margin: 0 0 -0.5rem 0.5rem;
    }
`;

const Overstyring = ({ åpen, onOverstyring }: OverstyringProps) => {
    return (
        <Overstyringsknapp onClick={onOverstyring}>
            {åpen ? <IkonÅpen /> : <IkonLåst />}
            {åpen ? <p>Lukk</p> : <p>Overstyre</p>}
        </Overstyringsknapp>
    );
};

export default Overstyring;
