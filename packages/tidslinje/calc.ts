import { Utsnitt } from './types';
import dayjs from 'dayjs';

const dagerIUtsnitt = (utsnitt: Utsnitt, maksDato: string = dayjs().format('YYYY-MM-DD')) => {
    const nå = dayjs(maksDato, 'YYYY-MM-DD');
    const da = nå.subtract(utsnitt, 'month');

    return nå.diff(da, 'day');
};

export const kalkulerPosisjonOgBredde = (start: string, slutt: string, utsnitt: Utsnitt, maksDato: string) => {
    const dager = dagerIUtsnitt(utsnitt, maksDato);
    const startAvUtsnitt = dayjs(maksDato).subtract(dager, 'day');
    const startDato = dayjs(start, 'DD-MM-YYYY');
    const sluttDato = dayjs(slutt, 'DD-MM-YYYY');

    const width = Math.abs((startDato.diff(sluttDato, 'day') / dager) * 100);
    const left = 100 - (startDato.diff(startAvUtsnitt, 'day') / dager) * 100 - width;

    return { left, width };
};

export const månederIUtsnitt = (utsnitt: Utsnitt, maksDato: string = dayjs().format('YYYY-MM-DD')) => {
    const måneder = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
    const aktuellMåned = dayjs(maksDato, 'YYYY-MM-DD').month();

    return new Array(utsnitt).fill(0).map((_, i) => {
        const index = aktuellMåned - i;
        const nåværendeMåned = index < 0 ? index + 12 : index;
        const dato = dayjs(maksDato, 'YYYY-MM-DD')
            .subtract(i, 'month')
            .startOf('month')
            .format('YYYY-MM-DD');

        return { dato, navn: måneder[nåværendeMåned] };
    });
};
