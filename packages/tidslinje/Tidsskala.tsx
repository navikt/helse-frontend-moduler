import styled from '@emotion/styled';
import React, { useContext } from 'react';
import {ettårsskala, halvtårsskala, isoDato, kalkulerPosisjonOgBredde, treårsskala} from './calc';
import { Skalapunkt, Skalastørrelse } from './types';
import { TidslinjeContext } from './Tidslinje';
import dayjs, { Dayjs } from 'dayjs';

interface TidsskalaProps {
    sisteDag: Dayjs;
}

interface MånedsskalaProps {
    sisteDag: Dayjs;
    utsnitt: Skalastørrelse;
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

const År = ({ sisteDag }: TidsskalaProps) => (
    <>
        {treårsskala(sisteDag).map((år, i) => {
            const { left } = kalkulerPosisjonOgBredde(
                isoDato(år.dato),
                isoDato(år.dato),
                Skalastørrelse.TreÅr,
                sisteDag
            );
            return (
                <Markering key={i} style={{ left: `${left}%` }}>
                    {år.navn}
                </Markering>
            );
        })}
    </>
);

const Måneder = ({ utsnitt, sisteDag }: MånedsskalaProps) => {
    const skala = utsnitt === Skalastørrelse.HalvtÅr ? halvtårsskala(sisteDag) : ettårsskala(sisteDag);
    return (
        <>
            {skala.map((måned: Skalapunkt, i: number) => {
                const { left } = kalkulerPosisjonOgBredde(isoDato(måned.dato), isoDato(måned.dato), utsnitt, sisteDag);
                return (
                    <Markering key={i} style={{ left: `${left}%` }}>
                        {måned.navn}
                    </Markering>
                );
            })}
        </>
    );
};

const Tidsskala = () => {
    const { skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    return (
        <Container>
            {skalastørrelse === Skalastørrelse.TreÅr ? (
                <År sisteDag={sisteDag} />
            ) : (
                <Måneder utsnitt={skalastørrelse} sisteDag={sisteDag} />
            )}
        </Container>
    );
};

export default Tidsskala;
