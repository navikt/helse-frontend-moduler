import React from 'react';
import { useTabell } from './useTabell';
import { Tabell, Tabellrad } from './Tabell';
import { FiltrerbarTabellHeader, SorterbarTabellHeader, TabellHeader } from './Head';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, renderHook } from '@testing-library/react-hooks';
import { Paginering } from './paginering';
import '@testing-library/jest-dom/extend-expect';

interface UseTabellTestProps {
    rader: Tabellrad[];
    headere: (TabellHeader | SorterbarTabellHeader | FiltrerbarTabellHeader)[];
    defaultPaginering?: Paginering;
}

const UseTabellComponent = ({ rader, headere, defaultPaginering }: UseTabellTestProps) => {
    const tabell = useTabell({ rader, headere, defaultPaginering });
    return (
        <>
            <Tabell beskrivelse="En test-tabell" {...tabell} />
            <p data-testid="antall-sider">{tabell.paginering?.antallSider}</p>
        </>
    );
};

const filtrerbareHeadere = [
    { render: 'Name' },
    {
        render: 'Type',
        filtere: [
            { label: 'Electric', func: (type: string) => type === '⚡️' },
            { label: 'Fire', func: (type: string) => type === '🔥' },
            { label: 'Water', func: (type: string) => type === '💦' },
            { label: 'Grass', func: (type: string) => type === '🥬' },
            { label: 'Ghost', func: (type: string) => type === '👻' },
            { label: 'Dragon', func: (type: string) => type === '🐉' }
        ]
    },
    {
        render: 'Evolution',
        filtere: [
            { label: 1, func: (evolution: number) => evolution === 1 },
            { label: 2, func: (evolution: number) => evolution === 2 },
            { label: 3, func: (evolution: number) => evolution === 3 }
        ]
    }
];

const rader = [
    { celler: ['Pikachu', '⚡️', 1] },
    { celler: ['Charmander', '🔥', 1] },
    { celler: ['Squirtle', '💦', 1] },
    { celler: ['Bulbasaur', '🥬', 1] },
    { celler: ['Haunter', '👻', 2] },
    { celler: ['Dragonite', '🐉', 3] }
];

describe('useTabell', () => {
    describe('filtrering', () => {
        test('filtrerer rader på én kolonne', async () => {
            render(<UseTabellComponent rader={rader} headere={filtrerbareHeadere} />);
            userEvent.click(screen.getByText('Type'));
            userEvent.click(screen.getByText('Electric'));
            await waitFor(() => {
                expect(screen.queryByText('Charmander')).toBeNull();
                expect(screen.queryByText('Pikachu')).toBeVisible();
            });
        });
        test('filtrerer rader på to kolonner samtidig', async () => {
            render(<UseTabellComponent rader={rader} headere={filtrerbareHeadere} />);
            userEvent.click(screen.getByText('Evolution'));
            userEvent.click(screen.getAllByText('1')[0]);
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeVisible();
                expect(screen.queryByText('Charmander')).toBeVisible();
                expect(screen.queryByText('Squirtle')).toBeVisible();
                expect(screen.queryByText('Bulbasaur')).toBeVisible();
                expect(screen.queryByText('Haunter')).toBeNull();
                expect(screen.queryByText('Dragonite')).toBeNull();
            });
            userEvent.click(screen.getByText('Type'));
            userEvent.click(screen.getByText('Dragon'));
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeNull();
                expect(screen.queryByText('Charmander')).toBeNull();
                expect(screen.queryByText('Squirtle')).toBeNull();
                expect(screen.queryByText('Bulbasaur')).toBeNull();
                expect(screen.queryByText('Haunter')).toBeNull();
                expect(screen.queryByText('Dragonite')).toBeNull();
            });
            userEvent.click(screen.getByText('Evolution'));
            userEvent.click(screen.getAllByText('1')[0]);
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeNull();
                expect(screen.queryByText('Charmander')).toBeNull();
                expect(screen.queryByText('Squirtle')).toBeNull();
                expect(screen.queryByText('Bulbasaur')).toBeNull();
                expect(screen.queryByText('Haunter')).toBeNull();
                expect(screen.queryByText('Dragonite')).toBeVisible();
            });
        });
        test('toggler alle filtere samtidig', async () => {
            render(<UseTabellComponent rader={rader} headere={filtrerbareHeadere} />);
            userEvent.click(screen.getByText('Type'));
            userEvent.click(screen.getByText('Electric'));
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeVisible();
                expect(screen.queryByText('Charmander')).toBeNull();
                expect(screen.queryByText('Squirtle')).toBeNull();
                expect(screen.queryByText('Bulbasaur')).toBeNull();
                expect(screen.queryByText('Haunter')).toBeNull();
                expect(screen.queryByText('Dragonite')).toBeNull();
            });
            userEvent.click(screen.getByText('Velg alle'));
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeVisible();
                expect(screen.queryByText('Charmander')).toBeVisible();
                expect(screen.queryByText('Squirtle')).toBeVisible();
                expect(screen.queryByText('Bulbasaur')).toBeVisible();
                expect(screen.queryByText('Haunter')).toBeVisible();
                expect(screen.queryByText('Dragonite')).toBeVisible();
            });
            userEvent.click(screen.getByText('Opphev alle'));
            await waitFor(() => {
                expect(screen.queryByText('Pikachu')).toBeVisible();
                expect(screen.queryByText('Charmander')).toBeVisible();
                expect(screen.queryByText('Squirtle')).toBeVisible();
                expect(screen.queryByText('Bulbasaur')).toBeVisible();
                expect(screen.queryByText('Haunter')).toBeVisible();
                expect(screen.queryByText('Dragonite')).toBeVisible();
            });
        });
        test('kan settes fra utsiden', () => {
            const { result } = renderHook(() => useTabell({ rader, headere: filtrerbareHeadere }));
            act(() => {
                result.current.filtrering.set(f => ({
                    filtere: f.filtere.map(({ filter, ...rest }) =>
                        filter.label === 1 ? { filter, ...rest, active: true } : { filter, ...rest }
                    )
                }));
            });
            expect(result.current.rader.length).toEqual(4);
            act(() => {
                result.current.filtrering.set(f => ({
                    filtere: f.filtere.map(({ filter, ...rest }) =>
                        filter.label === 1 ? { filter, ...rest, active: false } : { filter, ...rest }
                    )
                }));
            });
            expect(result.current.rader.length).toEqual(6);
        });
    });
    describe('paginering', () => {
        test('lager riktig antall sider', async () => {
            const { result } = renderHook(() =>
                useTabell({
                    rader,
                    headere: ['Name', 'Type', 'Evolutions'],
                    defaultPaginering: { antallRaderPerSide: 4, sidenummer: 1 }
                })
            );

            expect(result.current.paginering?.antallSider).toBe(2);
        });
        test('endrer antall sider når filter endres', async () => {
            render(
                <UseTabellComponent
                    rader={rader}
                    headere={filtrerbareHeadere}
                    defaultPaginering={{ antallRaderPerSide: 4, sidenummer: 1 }}
                />
            );
            expect(screen.queryByTestId('antall-sider')).toHaveTextContent('2');
            userEvent.click(screen.getByText('Evolution'));
            userEvent.click(screen.getAllByText('1')[0]);
            expect(await screen.findByTestId('antall-sider')).toHaveTextContent('1');
        });
    });
});
