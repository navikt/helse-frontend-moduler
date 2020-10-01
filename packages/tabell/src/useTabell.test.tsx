import React, { ReactNode } from 'react';
import { useTabell } from './useTabell';
import { Tabell } from './Tabell';
import { FiltrerbarTabellHeader, SorterbarTabellHeader, TabellHeader } from './Head';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

interface UseTabellTestProps {
    rader: ReactNode[][];
    headere: (TabellHeader | SorterbarTabellHeader | FiltrerbarTabellHeader)[];
}

const UseTabellComponent = ({ rader, headere }: UseTabellTestProps) => {
    const tabell = useTabell({ rader, headere });
    return <Tabell beskrivelse="En test-tabell" {...tabell} />;
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
    ['Pikachu', '⚡️', 1],
    ['Charmander', '🔥', 1],
    ['Squirtle', '💦', 1],
    ['Bulbasaur', '🥬', 1],
    ['Haunter', '👻', 2],
    ['Dragonite', '🐉', 3]
];

describe('useTabell', () => {
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
});
