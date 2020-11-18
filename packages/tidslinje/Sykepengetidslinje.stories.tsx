import React, { useState } from 'react';
import { Periode, Sykepengeperiode, Sykepengetidslinje, Vedtaksperiodetilstand } from './src';
import { SykepengetidslinjeProps } from './src/components/sykepengetidslinje/Sykepengetidslinje';

export default {
    title: 'Tidslinje/Sykepengetidslinje',
    component: Sykepengetidslinje,
    argTypes: {
        rader: {
            defaultValue: [
                [
                    {
                        id: '123',
                        fom: new Date('2020-01-01'),
                        tom: new Date('2020-01-31'),
                        status: Vedtaksperiodetilstand.Annullert
                    },
                    {
                        id: '234',
                        fom: new Date('2020-02-01'),
                        tom: new Date('2020-02-29'),
                        status: Vedtaksperiodetilstand.Utbetalt
                    },
                    {
                        id: '345',
                        fom: new Date('2020-03-01'),
                        tom: new Date('2020-03-31'),
                        status: Vedtaksperiodetilstand.Utbetalt
                    },
                    {
                        id: '456',
                        fom: new Date('2020-07-01'),
                        tom: new Date('2020-07-31'),
                        status: Vedtaksperiodetilstand.Utbetalt
                    },
                    {
                        id: '567',
                        fom: new Date('2020-08-01'),
                        tom: new Date('2020-08-31'),
                        status: Vedtaksperiodetilstand.UtbetaltAutomatisk
                    },
                    {
                        id: '568',
                        fom: new Date('2020-09-01'),
                        tom: new Date('2020-09-30'),
                        status: Vedtaksperiodetilstand.TilUtbetalingAutomatisk
                    },
                    {
                        id: '569',
                        fom: new Date('2020-10-01'),
                        tom: new Date('2020-10-31'),
                        status: Vedtaksperiodetilstand.Oppgaver
                    }
                ],
                [
                    {
                        id: '678',
                        fom: new Date('2020-02-01'),
                        tom: new Date('2020-02-29'),
                        disabled: true,
                        disabledLabel: 'Dette er en ferieperiode fra Infotrygd',
                        status: Vedtaksperiodetilstand.Infotrygdferie
                    },
                    {
                        id: '789',
                        fom: new Date('2020-03-01'),
                        tom: new Date('2020-03-31'),
                        disabled: true,
                        disabledLabel: 'Dette er en ferieperiode fra Infotrygd',
                        status: Vedtaksperiodetilstand.Infotrygdferie
                    }
                ]
            ]
        }
    }
};

export const TidslinjeForSykepenger = (args: SykepengetidslinjeProps) => {
    const [rader, setRader] = useState<Sykepengeperiode[][]>(args.rader);
    const [aktivPeriode, setAktivPeriode] = useState<Periode>();

    const onSelectPeriode = (periode: Periode) => {
        setAktivPeriode(periode);
        setRader(rader => rader.map(rad => rad.map(p => ({ ...p, active: periode.id === p.id }))));
    };

    const aktivRad =
        aktivPeriode &&
        rader.reduce(
            (radIndex: number, rad: Sykepengeperiode[], i: number) =>
                rad.find(({ id }) => id === aktivPeriode.id) ? i : radIndex,
            undefined
        );

    return <Sykepengetidslinje onSelectPeriode={onSelectPeriode} rader={rader} aktivRad={aktivRad} />;
};
