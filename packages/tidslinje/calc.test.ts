import { Utsnitt } from './types';
import { dagerIUtsnitt } from './calc';

test('dager i utsnitt', () => {
    expect(dagerIUtsnitt(Utsnitt.HalvtÅr, '2018-01-01')).toEqual(184);
    expect(dagerIUtsnitt(Utsnitt.EttÅr, '2018-01-01')).toEqual(365);
    expect(dagerIUtsnitt(Utsnitt.TreÅr, '2018-01-01')).toEqual(1096);

    expect(dagerIUtsnitt(Utsnitt.HalvtÅr, 'i morgen')).toEqual(NaN);
});
