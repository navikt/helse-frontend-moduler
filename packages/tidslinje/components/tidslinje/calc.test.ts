import { breddeMellomDatoer, erDelAv, erLike, overlapper } from './calc';
import dayjs from 'dayjs';

const enPeriode = ({ fom = dayjs('2020-01-01'), tom = dayjs('2020-01-01') } = {}) => ({ fom, tom });

test('breddeMellomDatoer', () => {
    expect(breddeMellomDatoer(dayjs('2020-01-01'), dayjs('2020-01-01'), 100)).toBe(0);
    expect(breddeMellomDatoer(dayjs('2020-01-01'), dayjs('2020-01-02'), 100)).toBe(1);
    expect(breddeMellomDatoer(dayjs('2020-01-01'), dayjs('2020-01-99'), 100)).toBe(98);
});

test('erLike', () => {
    expect(erLike(enPeriode(), enPeriode())).toBeTruthy();
    expect(erLike(enPeriode(), enPeriode({ tom: dayjs('2020-01-02') }))).toBeFalsy();
    expect(
        erLike(
            enPeriode({
                fom: dayjs('2021-03-04'),
                tom: dayjs('2021-03-15')
            }),
            enPeriode({ fom: dayjs('2021-03-04'), tom: dayjs('2021-03-15') })
        )
    ).toBeTruthy();
});

test('erDelAv', () => {
    expect(erDelAv(enPeriode(), enPeriode())).toBeFalsy();
    expect(
        erDelAv(
            enPeriode({ tom: dayjs('2020-01-04') }),
            enPeriode({ fom: dayjs('2020-01-02'), tom: dayjs('2020-01-03') })
        )
    ).toBeTruthy();
    expect(erDelAv(enPeriode(), enPeriode({ tom: dayjs('2020-01-02') }))).toBeFalsy();
});

test('overlapper', () => {
    expect(overlapper(enPeriode(), enPeriode())).toBeTruthy();
    expect(overlapper(enPeriode(), enPeriode({ tom: dayjs('2020-01-02') }))).toBeFalsy();
    expect(
        overlapper(
            enPeriode({
                fom: dayjs('2021-03-04'),
                tom: dayjs('2021-03-15')
            }),
            enPeriode({ fom: dayjs('2021-03-04'), tom: dayjs('2021-03-15') })
        )
    ).toBeTruthy();
    expect(
        overlapper(
            enPeriode({ tom: dayjs('2020-01-04') }),
            enPeriode({ fom: dayjs('2020-01-02'), tom: dayjs('2020-01-03') })
        )
    ).toBeTruthy();
    expect(overlapper(enPeriode(), enPeriode({ tom: dayjs('2020-01-02') }))).toBeFalsy();
});
