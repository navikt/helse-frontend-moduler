import React, { useCallback, useMemo, useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Periode, Sykepengetidslinje, Vedtaksperiodetilstand } from '../packages/tidslinje/src';
import './styles.css';
import dayjs from 'dayjs';

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
                fom: dayjs(new Date('2019-11-05'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-11-26'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Venter,
                disabledLabel: enEtikett('Venter på tidligere vedtaksperiode')
            },
            {
                id: '234',
                fom: dayjs(new Date('2019-10-18'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-11-04'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Oppgaver
            },
            {
                id: '345',
                fom: dayjs(new Date('2019-10-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-10-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '456',
                fom: dayjs(new Date('2019-08-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-08-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Ukjent,
                disabledLabel: enEtikett('Ukjent tilstand på vedtaksperioden')
            },
            {
                id: '567',
                fom: dayjs(new Date('2019-06-01'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-06-25'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '678',
                fom: dayjs(new Date('2019-05-05'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-05-30'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '789',
                fom: dayjs(new Date('2019-04-20'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-05-04'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.IngenUtbetaling,
                disabledLabel: enEtikett('Ingen utbetalinger for perioden')
            }
        ]
    },
    {
        perioder: [
            {
                id: '135',
                fom: dayjs(new Date('2019-02-10'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-02-25'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '246',
                fom: dayjs(new Date('2019-02-26'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-03-15'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '689',
                fom: dayjs(new Date('2019-04-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-04-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.UtbetaltIInfotrygd,
                disabled: true,
                disabledLabel: enEtikett('Utbetalt i Infotrygd')
            }
        ]
    },
    {
        perioder: [
            {
                id: '357',
                fom: dayjs(new Date('2019-10-18'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-11-04'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Oppgaver
            },
            {
                id: '468',
                fom: dayjs(new Date('2019-08-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-08-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Annullert,
                disabledLabel: (
                    <span className="flex-column">
                        {enEtikett('Annullert')}
                        {enEtikett('Hans Hansen 20.04.2020')}
                    </span>
                )
            },
            {
                id: '579',
                fom: dayjs(new Date('2019-10-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-10-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Utbetalt
            },
            {
                id: '680',
                fom: dayjs(new Date('2019-04-02'))
                    .startOf('day')
                    .toDate(),
                tom: dayjs(new Date('2019-04-17'))
                    .endOf('day')
                    .toDate(),
                status: Vedtaksperiodetilstand.Avslag
            }
        ]
    }
];

const startDato = new Date('2019-02-01');
const sluttDato = new Date('2020-01-01');

export const tidslinje = () => {
    const [aktivPeriode, setAktivPeriode] = useState<{ fom: Date; tom: Date }>(rader[0].perioder[1]);

    const onSelectPeriode = useCallback((periode: Periode) => {
        console.log(periode);
        setAktivPeriode(periode);
    }, []);

    return useMemo(
        () => (
            <Sykepengetidslinje
                rader={rader}
                startDato={startDato}
                sluttDato={sluttDato}
                onSelectPeriode={onSelectPeriode}
                aktivPeriode={aktivPeriode}
            />
        ),
        [aktivPeriode]
    );
};

export const kortSammenhengende = () => {
    const rader = [
        {
            perioder: [
                {
                    id: 'abc',
                    fom: dayjs(new Date('2020-01-01'))
                        .startOf('day')
                        .toDate(),
                    tom: dayjs(new Date('2020-01-31'))
                        .endOf('day')
                        .toDate(),
                    status: Vedtaksperiodetilstand.Utbetalt
                },
                {
                    id: 'bcd',
                    fom: dayjs(new Date('2020-02-01'))
                        .startOf('day')
                        .toDate(),
                    tom: dayjs(new Date('2020-02-14'))
                        .endOf('day')
                        .toDate(),
                    status: Vedtaksperiodetilstand.Oppgaver
                }
            ]
        }
    ];
    const onSelectPeriode = (periode: Periode) => console.log(periode.status, periode.fom, periode.tom);
    return (
        <Sykepengetidslinje
            rader={rader}
            startDato={dayjs('2020-02-14')
                .subtract(1, 'year')
                .endOf('day')
                .toDate()}
            sluttDato={dayjs('2020-02-14')
                .endOf('day')
                .toDate()}
            onSelectPeriode={onSelectPeriode}
        />
    );
};
