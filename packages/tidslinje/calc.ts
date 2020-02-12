import { Skalapunkt, Skalastørrelse } from './types';
import dayjs, { Dayjs } from 'dayjs';

export const isoDato = (string: string) => dayjs(string, 'YYYY-MM-DD');

export const dagerISkala = (skalastørrelse: Skalastørrelse, sisteDag: Dayjs = dayjs()) => {
    const førsteDag = sisteDag.subtract(skalastørrelse, 'month');
    return sisteDag.diff(førsteDag, 'day');
};

export const kalkulerPosisjonOgBredde = (
    start: Dayjs,
    slutt: Dayjs,
    skalastørrelse: Skalastørrelse,
    sisteDag: Dayjs
) => {
    const dager = dagerISkala(skalastørrelse, sisteDag);
    const startAvUtsnitt = sisteDag.subtract(dager, 'day');

    const width = Math.abs((start.diff(slutt, 'day') / dager) * 100);
    const left = 100 - (start.diff(startAvUtsnitt, 'day') / dager) * 100 - width;

    return { left, width };
};

function lagSkala(sisteDag: Dayjs, skalastørrelse: Skalastørrelse): Skalapunkt[] {
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
}

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
