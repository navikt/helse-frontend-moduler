import styled from '@emotion/styled';
import React from 'react';
import { kalkulerPosisjonOgBredde, månederIUtsnitt } from './calc';
import { Utsnitt } from './types';

interface TidsskalaProps {
    utsnitt: Utsnitt;
    maksDato: string;
}

const Container = styled('div')`
    flex: 1;
    display: flex;
    border-bottom: 1px solid #e7e9e9;
    align-items: center;
    position: relative;
`;

const Markering = styled('div')`
    font-size: 14px;
    color: #78706a;
    position: absolute;
    transform: translateX(-50%);
`;

const Tidsskala = ({ utsnitt, maksDato }: TidsskalaProps) => {
    return (
        <Container>
            {månederIUtsnitt(utsnitt, maksDato).map((måned, i) => {
                const { left } = kalkulerPosisjonOgBredde(måned.dato, måned.dato, utsnitt, maksDato);
                return (
                    <Markering key={i} style={{ left: `${left}%` }}>
                        {måned.navn}
                    </Markering>
                );
            })}
        </Container>
    );
};

export default Tidsskala;
