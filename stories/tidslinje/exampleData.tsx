import React, { useState } from 'react';
import {
    EnkelPeriode,
    Periode,
    Sykepengeperiode,
    Tidslinje as _Tidslinje,
    Vedtaksperiodetilstand,
    Sykepengetidslinje as _Sykepengetidslinje
} from '../../packages/tidslinje/src';
import './tidslinje.css';
import { SykepengetidslinjeProps } from '../../packages/tidslinje/src/components/sykepengetidslinje/Sykepengetidslinje';
import dayjs from 'dayjs';

export interface TidslinjeProps {
    /**
     * Periodene som inngår i tidslinjen.
     */
    rader: Periode[][];
    /**
     * Tidligste dato som skal vises visuelt på tidslinjen. Mao. datoen helt til høyre.
     * Defaulter til tidligste dato blandt alle perioder i tidslinjen.
     */
    startDato?: Date;
    /**
     * Seneste dato som skal vises visuelt på tidslinjen. Mao. datoen helt til venstre.
     * Defaulter til seneste dato blandt alle perioder i tidslinjen.
     */
    sluttDato?: Date;
    /**
     * Handling som skal skje når en bruker klikker/interagerer med en periodeknapp.
     * Dette vil typisk være å sette den valgte perioden til å være den aktive perioden.
     */
    onSelectPeriode?: (periode: Periode) => void;
    /**
     * Perioden som skal være aktiv/valgt.
     */
    aktivPeriode?: EnkelPeriode;
}

export const ExamplePeriode = (_: Periode) => null;

export const ExampleTidslinje = (_: TidslinjeProps) => null;

export const rader: Periode[][] = [
    [
        {
            fom: new Date('2019-11-05'),
            tom: new Date('2019-11-26'),
            status: 'inaktiv',
            disabled: true,
            disabledLabel: <p className="tooltip">Dette er en inaktiv periode</p>
        },
        {
            fom: new Date('2019-10-18'),
            tom: new Date('2019-11-04'),
            status: 'advarsel'
        },
        {
            fom: new Date('2019-10-02'),
            tom: new Date('2019-10-17'),
            status: 'suksess'
        },
        {
            fom: new Date('2019-06-01'),
            tom: new Date('2019-06-25'),
            status: 'suksess'
        },
        {
            fom: new Date('2019-05-05'),
            tom: new Date('2019-05-30'),
            status: 'suksess'
        }
    ],
    [
        {
            fom: new Date('2019-02-10'),
            tom: new Date('2019-02-25'),
            status: 'suksess'
        },
        {
            fom: new Date('2019-02-26'),
            tom: new Date('2019-03-15'),
            status: 'suksess'
        }
    ],
    [
        {
            fom: new Date('2019-10-18'),
            tom: new Date('2019-11-04'),
            status: 'advarsel'
        },
        {
            fom: new Date('2019-10-02'),
            tom: new Date('2019-10-17'),
            status: 'suksess'
        },
        {
            fom: new Date('2019-04-02'),
            tom: new Date('2019-04-17'),
            status: 'feil'
        }
    ]
];

export const aktivPeriode = null;
export const onSelectPeriode = (_: EnkelPeriode) => null;

export const Tidslinje = (props: TidslinjeProps) => {
    const [aktivPeriode, setAktivPeriode] = useState<EnkelPeriode>(rader[0][1]);
    const onSelectPeriode = (periode: EnkelPeriode) => {
        setAktivPeriode(periode);
    };

    return <_Tidslinje rader={props.rader} aktivPeriode={aktivPeriode} onSelectPeriode={onSelectPeriode} />;
};

/*
export interface Sykepengeperiode {
    id: string;
    fom: Date;
    tom: Date;
    status: Vedtaksperiodetilstand;
    disabled?: boolean;
    className?: string;
    disabledLabel?: ReactNode;
    active?: boolean;
}
 */

const enEtikett = (tekst: string) => <p className="tooltip">{tekst}</p>;

export const sykepengerader: Sykepengeperiode[][] = [
    [
        {
            id: '123',
            fom: new Date('2019-11-05'),
            tom: new Date('2019-11-26'),
            status: Vedtaksperiodetilstand.Venter,
            disabledLabel: enEtikett('Venter på tidligere vedtaksperiode')
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
            disabledLabel: enEtikett('Ukjent tilstand på vedtaksperioden')
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
            disabledLabel: enEtikett('Ingen utbetalinger for perioden')
        }
    ],
    [
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
        },
        {
            id: '689',
            fom: new Date('2019-04-02'),
            tom: new Date('2019-04-17'),
            status: Vedtaksperiodetilstand.UtbetaltIInfotrygd,
            disabled: true,
            disabledLabel: enEtikett('Utbetalt i Infotrygd')
        }
    ],
    [
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
            disabledLabel: (
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
];

export const Sykepengetidslinje = (props: SykepengetidslinjeProps) => {
    const [aktivPeriode, setAktivPeriode] = useState<EnkelPeriode>(rader[0][1]);
    const onSelectPeriode = (periode: EnkelPeriode) => {
        setAktivPeriode(periode);
    };

    return <_Sykepengetidslinje rader={props.rader} aktivPeriode={aktivPeriode} onSelectPeriode={onSelectPeriode} />;
};

export const TilpassetTidslinjespenn = () => {
    const [aktivPeriode, setAktivPeriode] = useState<EnkelPeriode>(rader[0][1]);
    const onSelectPeriode = (periode: EnkelPeriode) => setAktivPeriode(periode);

    const opprinneligSluttdato = dayjs('2019-12-30');
    const [startdato, setStartdato] = useState(dayjs('2019-01-01'));
    const [sluttdato, setSluttdato] = useState(opprinneligSluttdato);

    const maxRange = 365;
    const dagerMellomStartOgSlutt = sluttdato.diff(startdato, 'day');

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <_Sykepengetidslinje
                rader={sykepengerader}
                aktivPeriode={aktivPeriode}
                onSelectPeriode={onSelectPeriode}
                startDato={startdato.toDate()}
                sluttDato={sluttdato.toDate()}
            />
            <label className="flex-column">
                <p>Flytt startdato</p>
                <input
                    type="range"
                    max={maxRange}
                    min={0}
                    onChange={event => {
                        setStartdato(sluttdato.subtract(+event.target.value, 'day'))
                    }}
                />
            </label>
            <label className="flex-column">
                <p>Flytt startdato og sluttdato</p>
                <input
                    type="range"
                    max={maxRange - dagerMellomStartOgSlutt}
                    min={0}
                    onChange={event => {
                        const nySluttdato = opprinneligSluttdato.subtract(+event.target.value, 'day');
                        setSluttdato(nySluttdato);
                        setStartdato(nySluttdato.subtract(dagerMellomStartOgSlutt, 'day'))
                    }}
                />
            </label>
        </div>
    );
};
