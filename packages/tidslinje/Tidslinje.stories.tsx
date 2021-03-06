import React, { useState } from 'react';
import { Periode, Sykepengetidslinje, Tidslinje, TidslinjeProps } from './src';

export default {
    title: 'Tidslinje/Tidslinje',
    component: Tidslinje,
    subcomponents: { Sykepengetidslinje },
    argTypes: {
        rader: {
            defaultValue: [
                [
                    { id: '123', fom: new Date('2020-01-01'), tom: new Date('2020-01-31'), status: 'suksess' },
                    { id: '234', fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'suksess' },
                    { id: '345', fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'suksess' },
                    { id: '456', fom: new Date('2020-07-01'), tom: new Date('2020-07-31'), status: 'suksess' },
                    { id: '567', fom: new Date('2020-08-01'), tom: new Date('2020-08-31'), status: 'advarsel' }
                ],
                [
                    { id: '678', fom: new Date('2020-02-01'), tom: new Date('2020-02-29'), status: 'inaktiv' },
                    { id: '789', fom: new Date('2020-03-01'), tom: new Date('2020-03-31'), status: 'inaktiv' }
                ]
            ]
        },
        pins: {
            defaultValue: [{ date: new Date('2020-03-15'), render: 'Dette er en pin' }]
        }
    }
};

export const Basic = (args: TidslinjeProps) => {
    const [rader, setRader] = useState<Periode[][]>(args.rader);
    const [aktivPeriode, setAktivPeriode] = useState<Periode>();

    const onSelectPeriode = (periode: Periode) => {
        console.log(periode);
        setAktivPeriode(periode);
        setRader(rader => rader.map(rad => rad.map(p => ({ ...p, active: periode.id === p.id }))));
    };

    const aktivRad =
        aktivPeriode &&
        rader.reduce(
            (radIndex: number, rad: Periode[], i: number) =>
                rad.find(({ id }) => id === aktivPeriode.id) ? i : radIndex,
            undefined
        );
    return <Tidslinje {...args} aktivRad={aktivRad} onSelectPeriode={onSelectPeriode} />;
};
Basic.storyName = 'Enkel tidslinje';
