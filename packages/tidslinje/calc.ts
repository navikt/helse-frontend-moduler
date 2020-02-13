import { Skalapunkt, Skalastørrelse } from './types';
import dayjs, { Dayjs } from 'dayjs';

export const isoDato = (string: string) => dayjs(string, 'YYYY-MM-DD');

export const dagerISkala = (skalastørrelse: Skalastørrelse, sisteDag: Dayjs = dayjs()) => {
    const førsteDag = sisteDag.subtract(skalastørrelse, 'month');
    return sisteDag.diff(førsteDag, 'day');
};

export const kalkulerPosisjonOgBredde = (
    periodeFom: Dayjs,
    periodeTom: Dayjs,
    skalastørrelse: Skalastørrelse,
    tidslinjeTom: Dayjs
) => {
    const antallDager = dagerISkala(skalastørrelse, tidslinjeTom);
    const dagerIPerioden = periodeFom.diff(periodeTom, 'day');
    const dagerEtterPeriode = periodeTom.diff(tidslinjeTom, 'day');
    const width = Math.abs((dagerIPerioden / antallDager) * 100);
    const left = Math.abs((dagerEtterPeriode / antallDager) * 100);

    return { left, width };
};

const lagSkala = (sisteDag: Dayjs, skalastørrelse: Skalastørrelse): Skalapunkt[] => {
    const måneder = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
    return new Array(skalastørrelse).fill(0).map((_, i) => {
        const index = sisteDag.month() - i;
        const nåværendeMåned = index < 0 ? index + 12 : index;
        const dato = sisteDag
            .subtract(i, 'month')
            .startOf('month')
            .format('YYYY-MM-DD');

        return { dato, navn: måneder[nåværendeMåned] };
    });
};

export const halvtårsskala = (sisteDag: Dayjs): Skalapunkt[] => lagSkala(sisteDag, Skalastørrelse.HalvtÅr);

export const ettårsskala = (sisteDag: Dayjs): Skalapunkt[] => lagSkala(sisteDag, Skalastørrelse.EttÅr);

export const treårsskala = (sisteDag: Dayjs): Skalapunkt[] => {
    const sisteÅr = sisteDag.startOf('year');
    const lagÅr = (startÅr: Dayjs, deltaÅr: number) => ({
        dato: startÅr.subtract(deltaÅr, 'year').format('YYYY-MM-DD'),
        navn: startÅr.subtract(deltaÅr, 'year').format('YYYY')
    });
    return [lagÅr(sisteÅr, 0), lagÅr(sisteÅr, 1), lagÅr(sisteÅr, 2)];
};
