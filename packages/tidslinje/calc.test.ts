import { Skalastørrelse } from './types';
import { dagerISkala, ettårsskala, halvtårsskala, isoDato, kalkulerPosisjonOgBredde, treårsskala } from './calc';

test('dager i utsnitt', () => {
    expect(dagerISkala(Skalastørrelse.HalvtÅr, isoDato('2018-01-01'))).toEqual(184);
    expect(dagerISkala(Skalastørrelse.EttÅr, isoDato('2018-01-01'))).toEqual(365);
    expect(dagerISkala(Skalastørrelse.TreÅr, isoDato('2018-01-01'))).toEqual(1096);
});

test('kalkuler posisjon og bredde', () => {
    const periodeEn = kalkulerPosisjonOgBredde(
        isoDato('2018-01-01'),
        isoDato('2018-01-10'),
        Skalastørrelse.HalvtÅr,
        isoDato('2018-06-01')
    );
    const periodeTo = kalkulerPosisjonOgBredde(
        isoDato('2018-01-11'),
        isoDato('2018-01-20'),
        Skalastørrelse.HalvtÅr,
        isoDato('2018-06-01')
    );

    expect(periodeEn.width).toEqual(periodeTo.width);
    expect(periodeEn.left).toBeGreaterThan(periodeTo.left);
});

test('måneder i utsnitt', () => {
    const månederIEtHalvtÅr = halvtårsskala(isoDato('2018-06-01'));
    const månederIEtÅr = ettårsskala(isoDato('2018-12-01'));

    expect(månederIEtHalvtÅr).toHaveLength(6);
    [
        { dato: '2018-01-01', navn: 'Jan' },
        { dato: '2018-02-01', navn: 'Feb' },
        { dato: '2018-03-01', navn: 'Mar' },
        { dato: '2018-04-01', navn: 'Apr' },
        { dato: '2018-05-01', navn: 'Mai' },
        { dato: '2018-06-01', navn: 'Jun' }
    ].forEach(måned => expect(månederIEtHalvtÅr).toContainEqual(måned));

    expect(månederIEtÅr).toHaveLength(12);
    [
        { dato: '2018-01-01', navn: 'Jan' },
        { dato: '2018-02-01', navn: 'Feb' },
        { dato: '2018-03-01', navn: 'Mar' },
        { dato: '2018-04-01', navn: 'Apr' },
        { dato: '2018-05-01', navn: 'Mai' },
        { dato: '2018-06-01', navn: 'Jun' },
        { dato: '2018-07-01', navn: 'Jul' },
        { dato: '2018-08-01', navn: 'Aug' },
        { dato: '2018-09-01', navn: 'Sep' },
        { dato: '2018-10-01', navn: 'Okt' },
        { dato: '2018-11-01', navn: 'Nov' },
        { dato: '2018-12-01', navn: 'Des' }
    ].forEach(måned => expect(månederIEtÅr).toContainEqual(måned));
});

test('år i utsnitt', () => {
    const beregnetÅrIUtsnitt = treårsskala(isoDato('2020-12-01'));

    expect(beregnetÅrIUtsnitt).toHaveLength(3);
    [
        { dato: '2020-01-01', navn: '2020' },
        { dato: '2019-01-01', navn: '2019' },
        { dato: '2018-01-01', navn: '2018' }
    ].forEach(år => expect(beregnetÅrIUtsnitt).toContainEqual(år));
});
