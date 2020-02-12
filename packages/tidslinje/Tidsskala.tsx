import styled from '@emotion/styled';
import React, {useContext} from 'react';
import {kalkulerPosisjonOgBredde, månederIUtsnitt, årIUtsnitt} from './calc';
import {Utsnitt} from './types';
import {TidslinjeContext} from './Tidslinje';

interface TidsskalaProps {
    maksDato: string;
}

interface MånedsskalaProps {
    maksDato: string;
    utsnitt: Utsnitt;
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

const År = ({ maksDato }: TidsskalaProps) => (
    <>
        {årIUtsnitt(maksDato).map((år, i) => {
            const { left } = kalkulerPosisjonOgBredde(år.dato, år.dato, Utsnitt.TreÅr, maksDato);
            return (
                <Markering key={i} style={{ left: `${left}%` }}>
                    {år.navn}
                </Markering>
            );
        })}
    </>
);

const Måneder = ({ utsnitt, maksDato }: MånedsskalaProps) => (
    <>
        {månederIUtsnitt(utsnitt, maksDato).map((måned, i) => {
            const { left } = kalkulerPosisjonOgBredde(måned.dato, måned.dato, utsnitt, maksDato);
            return (
                <Markering key={i} style={{ left: `${left}%` }}>
                    {måned.navn}
                </Markering>
            );
        })}
    </>
);

const Tidsskala = ({ maksDato }: TidsskalaProps) => {
    const { utsnitt } = useContext(TidslinjeContext);

    return (
        <Container>
            {utsnitt === Utsnitt.TreÅr ? <År maksDato={maksDato} /> : <Måneder utsnitt={utsnitt} maksDato={maksDato} />}
        </Container>
    );
};

export default Tidsskala;
