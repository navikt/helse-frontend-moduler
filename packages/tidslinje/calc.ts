import { Utsnitt } from './types';
import dayjs from 'dayjs';

export const kalkulerPosisjonOgBredde = (start: string, slutt: string, dager: number, maksDato: string) => {
    const startAvUtsnitt = dayjs(maksDato).subtract(dager, 'day');
    const startDato = dayjs(start, 'DD-MM-YYYY');
    const sluttDato = dayjs(slutt, 'DD-MM-YYYY');

    return {
        right: (startDato.diff(startAvUtsnitt, 'day') / dager) * 100,
        width: Math.abs((startDato.diff(sluttDato, 'day') / dager) * 100)
    };
};

export const dagerIUtsnitt = (utsnitt: Utsnitt, maksDato: string = dayjs().format('YYYY-MM-DD')) => {
    const nå = dayjs(maksDato, 'YYYY-MM-DD');
    const da = nå.subtract(utsnitt, 'month');

    return nå.diff(da, 'day');
};

export const månederIUtsnitt = (utsnitt: Utsnitt, maksDato: string = dayjs().format('YYYY-MM-DD')) => {
    const måneder = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
    const aktuellMåned = dayjs(maksDato, 'YYYY-MM-DD').month();

    return new Array(utsnitt).fill(0).map((_, i) => {
        const index = aktuellMåned - i < 0 ? aktuellMåned - i + 12 : aktuellMåned - i;
        const dato = dayjs(maksDato, 'YYYY-MM-DD')
            .subtract(i, 'month')
            .startOf('month')
            .format('YYYY-MM-DD');

        return {
            dato,
            navn: måneder[index]
        };
    });
};
