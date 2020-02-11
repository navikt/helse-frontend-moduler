import React from 'react';
import IkonÅpen from './icons/IkonÅpen';
import IkonLåst from './icons/IkonLåst';
import styled from '@emotion/styled';

interface OverstyringProps {
    åpen: boolean;
    onOverstyring: () => void;
}

const blue = '#0067c5';

const Overstyringsknapp = styled('button')`
    border: none;
    color: ${blue};
    background: none;
    border-radius: 2px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    width: max-content;

    > p {
        margin: 0 0 -0.5rem 0.5rem;
    }

    &:hover > p {
        box-shadow: 0 1px 0 0 ${blue};
    }

    &:active,
    &:focus {
        outline: none;
        > p {
            box-shadow: 0 1px 0 0 ${blue};
        }
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
