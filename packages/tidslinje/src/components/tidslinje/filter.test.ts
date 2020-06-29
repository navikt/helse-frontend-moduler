import { innenEtDøgn, erSynlig } from './filter';
import dayjs, { Dayjs } from 'dayjs';
import { PosisjonertElement } from '../types.internal';

const enDato = ({ plussDager = 0, plussTimer = 0 } = {}): Dayjs =>
    dayjs('2020-01-01')
        .add(plussDager, 'day')
        .add(plussTimer, 'hour');

const etPosisjonertElement = (left = 50): PosisjonertElement => ({ left });

test('innenEtDøgn', () => {
    expect(innenEtDøgn(enDato(), enDato())).toBeTruthy();
    expect(innenEtDøgn(enDato(), enDato({ plussDager: 1 }))).toBeFalsy();
    expect(innenEtDøgn(enDato({ plussDager: 1 }), enDato())).toBeFalsy();
    expect(innenEtDøgn(enDato(), enDato({ plussTimer: 1 }))).toBeTruthy();
    expect(innenEtDøgn(enDato({ plussTimer: 1 }), enDato())).toBeTruthy();
});

test('outOfBounds', () => {
    expect(erSynlig(etPosisjonertElement())).toBeTruthy();
    expect(erSynlig(etPosisjonertElement(50))).toBeTruthy();
    expect(erSynlig(etPosisjonertElement(100))).toBeTruthy();
    expect(erSynlig(etPosisjonertElement(-1))).toBeFalsy();
    expect(erSynlig(etPosisjonertElement(101))).toBeFalsy();
});
