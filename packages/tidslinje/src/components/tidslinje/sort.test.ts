import { sisteDato, sisteEnklePeriode, sistePeriode } from './sort';
import dayjs, { Dayjs } from 'dayjs';
import { EnkelPeriode, PosisjonertPeriode } from '../types.internal';

const enDato = ({ plussDager = 0 } = {}): Dayjs => dayjs('2020-01-01').add(plussDager, 'day');

const enPeriode = ({ fom = enDato(), tom = enDato() } = {}): EnkelPeriode => ({ fom, tom });

const enPosisjonertPeriode = ({ horizontalPosition = 50 } = {}): PosisjonertPeriode => ({
    id: 'id',
    status: 'suksess',
    fom: dayjs(),
    tom: dayjs(),
    width: 123,
    horizontalPosition: horizontalPosition,
    direction: 'left'
});

test('sisteDato', () => {
    const usortert = [
        enDato({ plussDager: 1 }),
        enDato(),
        enDato({ plussDager: 2 }),
        enDato(),
        enDato({ plussDager: 3 })
    ];

    const sortert = [
        enDato({ plussDager: 3 }),
        enDato({ plussDager: 2 }),
        enDato({ plussDager: 1 }),
        enDato(),
        enDato()
    ];

    expect(usortert.sort(sisteDato)).toEqual(sortert);
});

test('sistePeriode', () => {
    const usortert = [
        enPosisjonertPeriode({ horizontalPosition: 50 }),
        enPosisjonertPeriode({ horizontalPosition: 0 }),
        enPosisjonertPeriode({ horizontalPosition: 12 }),
        enPosisjonertPeriode({ horizontalPosition: 80 }),
        enPosisjonertPeriode({ horizontalPosition: 33 })
    ];

    const sortert = [
        enPosisjonertPeriode({ horizontalPosition: 0 }),
        enPosisjonertPeriode({ horizontalPosition: 12 }),
        enPosisjonertPeriode({ horizontalPosition: 33 }),
        enPosisjonertPeriode({ horizontalPosition: 50 }),
        enPosisjonertPeriode({ horizontalPosition: 80 })
    ];
    expect(usortert.sort(sistePeriode)).toEqual(sortert);
});

test('sisteEnklePeriode', () => {
    const usortert = [
        enPeriode(),
        enPeriode({ fom: enDato({ plussDager: 1 }), tom: enDato({ plussDager: 3 }) }),
        enPeriode({ fom: enDato({ plussDager: 10 }), tom: enDato({ plussDager: 15 }) }),
        enPeriode({ tom: enDato({ plussDager: 1 }) }),
        enPeriode({ fom: enDato({ plussDager: 8 }), tom: enDato({ plussDager: 20 }) })
    ];
    const sortert = [
        enPeriode({ fom: enDato({ plussDager: 8 }), tom: enDato({ plussDager: 20 }) }),
        enPeriode({ fom: enDato({ plussDager: 10 }), tom: enDato({ plussDager: 15 }) }),
        enPeriode({ fom: enDato({ plussDager: 1 }), tom: enDato({ plussDager: 3 }) }),
        enPeriode({ tom: enDato({ plussDager: 1 }) }),
        enPeriode()
    ];

    expect(usortert.sort(sisteEnklePeriode)).toEqual(sortert);
});
