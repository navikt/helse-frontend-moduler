import styled from '@emotion/styled';
import React from 'react';
import { kalkulerPosisjonOgBredde, månederIUtsnitt } from './calc';
import { Utsnitt } from './types';
import dayjs, { Dayjs } from 'dayjs';

interface MånedsskalaProps {
    utsnitt: Utsnitt;
    maksDato: string;
}

interface ÅrsskalaProps {
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

const årIUtsnitt = (maksDato: string) => {
    const sisteÅr = dayjs(maksDato, 'YYYY-MM-DD').startOf('year');
    const lagÅr = (startÅr: Dayjs, deltaÅr: number) => ({
        dato: startÅr.subtract(deltaÅr, 'year').format('YYYY-MM-DD'),
        navn: startÅr.subtract(deltaÅr, 'year').format('YYYY')
    });
    return [lagÅr(sisteÅr, 0), lagÅr(sisteÅr, 1), lagÅr(sisteÅr, 2)];
};

const År = ({ maksDato }: ÅrsskalaProps) => (
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

const Tidsskala = ({ utsnitt, maksDato }: MånedsskalaProps) => (
    <Container>
        {utsnitt === Utsnitt.TreÅr ? <År maksDato={maksDato} /> : <Måneder utsnitt={utsnitt} maksDato={maksDato} />}
    </Container>
);

export default Tidsskala;
