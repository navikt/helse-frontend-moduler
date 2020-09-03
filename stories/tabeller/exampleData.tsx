import React, { ReactNode } from 'react';
import { Tabell, useTabell } from '../../packages/tabell/src';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TabellHeader } from '../../packages/tabell/src/Head';
import styled from '@emotion/styled';
import { Paginering } from '../../packages/tabell/src/paginering';

dayjs.extend(customParseFormat);

const tilMillisekunder = (norskDato: string) =>
    dayjs(norskDato, 'DD.MM.YYYY')
        .toDate()
        .getTime();

export const headere = ['Dato', 'Grad', 'Utbetaling'];

export const rader = [
    ['19.02.2019', '100%', '1234 kr'],
    ['20.02.2019', '50%', '617 kr'],
    ['21.02.2019', '50%', '617 kr'],
    ['22.02.2019', '80%', '987 kr'],
];

export const sorterbareHeadere: (ReactNode | TabellHeader)[] = [
    {
        render: 'Dato',
        sortFunction: (a: string, b: string) => tilMillisekunder(a) - tilMillisekunder(b),
    },
    {
        render: 'Grad',
        sortFunction: (a: number, b: number) => a - b,
    },
    {
        render: 'Utbetaling',
        sortFunction: (a: number, b: number) => a - b,
    },
];

export const sorterbareRader = [
    ['19.02.2019', 100, 1234],
    ['20.02.2019', 50, 617],
    ['21.02.2019', 50, 617],
    ['22.02.2019', 80, 987],
];

const renderer = (rad: ReactNode[]) => [rad[0], `${rad[1]}%`, `${rad[2]} kr`];

export const SorterbarTabell = () => {
    const { rader: tabellrader, headere: tabellheadere, sortering } = useTabell({
        rader: sorterbareRader,
        headere: sorterbareHeadere,
        renderer,
    });

    return (
        <Tabell beskrivelse="En sorterbar tabell" rader={tabellrader} headere={tabellheadere} sortering={sortering}/>
    );
};

const filtrerbareHeadere = [
    headere[0],
    {
        render: 'Grad',
        filtere: [
            { label: '< 100%', func: (grad: number) => grad < 100 },
            { label: '< 75%', func: (grad: number) => grad < 75 },
        ],
    },
    sorterbareHeadere[2],
];

const filtrerbareRader = [...sorterbareRader];

export const FiltrerbarTabell = () => {
    const renderer = (rad: ReactNode[]) => [rad[0], `${rad[1]}%`, `${rad[2]} kr`];
    const { rader: tabellrader, headere: tabellheadere, ...rest } = useTabell({
        rader: sorterbareRader,
        headere: filtrerbareHeadere,
        renderer,
    });

    console.log(rest.sortering);

    return <Tabell beskrivelse="En sorterbar tabell" rader={tabellrader} headere={tabellheadere} {...rest} />;
};

export const HeaderOverFlereKolonnerTabell = () => {
    return (
        <Tabell
            beskrivelse="Tabell med en headere som strekker seg over flere kolonnerl"
            rader={rader}
            headere={[
                {
                    render: 'Dato og gradering',
                    kolonner: 2,
                },
                'Utbetaling',
            ]}
        />
    );
};

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SideknappContainer = styled.div`
    margin: 0.5rem;
    > button:not(:last-of-type) {
        margin-right: 0.5rem;
    }
`;

const Sideknapp = styled.button<{ active?: boolean }>`
    border: none;
    background: none;
    border-radius: 0.25rem;
    font-family: Source Sans Pro;
    font-size: 16px;
    cursor: pointer;
    outline: none;

    &:focus {
        box-shadow: 0 0 0 3px #254b6d;
    }

    &:hover {
        color: #fff;
        background: #0067c5;
    }

    &:active {
        color: #fff;
        background: #254b6d;
    }

    ${({ active }) =>
    active &&
    `
        background: #0067c5;
        color: #fff;
        `}
`;

export const pagineringsrader = [
    ['19.02.2019', 100, 1234],
    ['20.02.2019', 50, 617],
    ['21.02.2019', 50, 617],
    ['22.02.2019', 80, 987],
    ['23.02.2019', 80, 987],
    ['24.02.2019', 50, 617],
    ['25.02.2019', 100, 1234],
    ['26.02.2019', 80, 987],
    ['27.02.2019', 100, 1234],
    ['28.02.2019', 80, 987],
    ['01.03.2019', 100, 1234],
    ['02.03.2019', 100, 1234],
    ['03.03.2019', 100, 1234],
    ['04.03.2019', 100, 1234],
    ['05.03.2019', 100, 1234],
    ['06.03.2019', 100, 1234],
    ['07.03.2019', 100, 1234],
    ['08.03.2019', 100, 1234],
    ['09.03.2019', 100, 1234],
    ['10.03.2019', 80, 987],
    ['11.03.2019', 80, 987],
    ['12.03.2019', 80, 987],
    ['13.03.2019', 80, 987],
    ['14.03.2019', 100, 1234],
    ['15.03.2019', 100, 1234],
    ['16.03.2019', 100, 1234],
    ['17.03.2019', 100, 1234],
    ['18.03.2019', 100, 1234],
    ['19.03.2019', 100, 1234],
];

const _paginering: Paginering = {
    sidenummer: 1,
    antallRaderPerSide: 6,
};

export const PaginertTabell = () => {
    const renderer = (rad: ReactNode[]) => [rad[0], `${rad[1]}%`, `${rad[2]} kr`];

    const { rader: tabellrader, headere: tabellheadere, paginering, ...rest } = useTabell({
        rader: pagineringsrader,
        headere: filtrerbareHeadere,
        renderer,
        defaultPaginering: _paginering,
    });

    const setSidenummer = (i: number) => paginering?.set(p => ({ ...p, sidenummer: i + 1 }));

    const incrementSidenummer = () =>
        paginering?.set(p => ({
            ...p,
            sidenummer: p.sidenummer + 1 > paginering?.antallSider ? paginering.antallSider : p.sidenummer + 1,
        }));

    const decrementSidenummer = () =>
        paginering?.set(p => ({
            ...p,
            sidenummer: p.sidenummer - 1 < 1 ? 1 : p.sidenummer - 1,
        }));

    return (
        <>
            <Tabell
                beskrivelse="en paginert tabell"
                rader={tabellrader}
                headere={tabellheadere}
                paginering={paginering}
                {...rest}
            />
            <BottomContainer>
                <p>
                    Viser {paginering?.førsteSynligeElement} til {paginering?.sisteSynligeElement} av{' '}
                    {tabellrader.length} oppgaver
                </p>
                {paginering?.antallSider! > 0 && (
                    <SideknappContainer>
                        <Sideknapp onClick={decrementSidenummer}>Forrige</Sideknapp>
                        {Array(paginering!.antallSider)
                            .fill(undefined)
                            .map((_, i) => (
                                <Sideknapp
                                    active={paginering?.sidenummer === i + 1}
                                    key={i}
                                    onClick={() => setSidenummer(i)}
                                >
                                    {i + 1}
                                </Sideknapp>
                            ))}
                        <Sideknapp onClick={incrementSidenummer}>Neste</Sideknapp>
                    </SideknappContainer>
                )}
            </BottomContainer>
        </>
    );
};
