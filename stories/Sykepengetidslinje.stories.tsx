import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Sykepengetidslinje, {
    Vedtaksperiodetilstand
} from '../packages/tidslinje/components/sykepengetidslinje/Sykepengetidslinje';
import { Periode } from '../packages/tidslinje';
import './styles.css';

export default {
    title: 'Tidslinje/Sykepengetidslinje',
    component: Sykepengetidslinje,
    decorators: [withA11y]
};

const enEtikett = (tekst: string) => <p className="undertekst nowrap left-aligned">{tekst}</p>;

const rader = [
    {
        perioder: [
            {
                id: '123',
                fom: new Date('2019-11-05'),
                tom: new Date('2019-11-26'),
                status: Vedtaksperiodetilstand.Venter,
                etikett: enEtikett('Venter på tidligere vedtaksperiode')
            },
            {
                id: '234',
                fom: new Date('2019-10-18'),
                tom: new Date('2019-11-04'),
                status: Vedtaksperiodetilstand.Oppgaver
            },
            {
                id: '345',
                fom: new Date('2019-10-02'),
                tom: new Date('2019-10-17'),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '456',
                fom: new Date('2019-08-02'),
                tom: new Date('2019-08-17'),
                status: Vedtaksperiodetilstand.Ukjent,
                etikett: enEtikett('Ukjent tilstand på vedtaksperioden')
            },
            {
                id: '567',
                fom: new Date('2019-06-01'),
                tom: new Date('2019-06-25'),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '678',
                fom: new Date('2019-05-05'),
                tom: new Date('2019-05-30'),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '789',
                fom: new Date('2019-04-20'),
                tom: new Date('2019-05-04'),
                status: Vedtaksperiodetilstand.IngenUtbetaling,
                etikett: enEtikett('Ingenting utbetalinger for perioden')
            }
        ]
    },
    {
        perioder: [
            {
                id: '135',
                fom: new Date('2019-02-10'),
                tom: new Date('2019-02-25'),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '246',
                fom: new Date('2019-02-26'),
                tom: new Date('2019-03-15'),
                status: Vedtaksperiodetilstand.Utbetalt
            }
        ]
    },
    {
        perioder: [
            {
                id: '357',
                fom: new Date('2019-10-18'),
                tom: new Date('2019-11-04'),
                status: Vedtaksperiodetilstand.Oppgaver
            },
            {
                id: '468',
                fom: new Date('2019-08-02'),
                tom: new Date('2019-08-17'),
                status: Vedtaksperiodetilstand.Annullert,
                etikett: (
                    <span className="flex-column">
                        {enEtikett('Annullert')}
                        {enEtikett('Hans Hansen 20.04.2020')}
                    </span>
                )
            },
            {
                id: '579',
                fom: new Date('2019-10-02'),
                tom: new Date('2019-10-17'),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '680',
                fom: new Date('2019-04-02'),
                tom: new Date('2019-04-17'),
                status: Vedtaksperiodetilstand.Avslag
            }
        ]
    }
];

export const tidslinje = () => {
    const startDato = new Date('2019-02-01');
    const sluttDato = new Date('2020-01-01');
    const onSelectPeriode = (periode: Periode) => console.log(periode.status, periode.fom, periode.tom);
    return (
        <Sykepengetidslinje
            rader={rader}
            startDato={startDato}
            sluttDato={sluttDato}
            onSelectPeriode={onSelectPeriode}
        />
    );
};
