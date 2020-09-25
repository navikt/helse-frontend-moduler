import { EnkelPeriode } from '../types.external';
import dayjs, { Dayjs } from 'dayjs';
import { breddeMellomDatoer } from './calc';

interface UsePositionAndSizeOptions {
    periode: EnkelPeriode;
    tidslinjestart: Dayjs;
    tidslinjeslutt: Dayjs;
    direction: 'left' | 'right';
}

const constrain = (value: number, min: number, max: number) => (value >= max ? max : value < min ? min : value);

export const usePositionAndSize = ({
    periode,
    tidslinjestart,
    tidslinjeslutt,
    direction
}: UsePositionAndSizeOptions) => {
    const fom = dayjs(periode.fom).startOf('day');
    const tom = dayjs(periode.tom).endOf('day');
    const totaltAntallDager = tidslinjeslutt.diff(tidslinjestart, 'day');

    const horizontalPosition = breddeMellomDatoer(tom, tidslinjeslutt, totaltAntallDager);
    const adjustedHorizontalPosition = constrain(horizontalPosition, 0, 100);

    const width = breddeMellomDatoer(fom, tom, totaltAntallDager);
    const adjustedWidth =
        adjustedHorizontalPosition + width >= 100
            ? 100 - adjustedHorizontalPosition
            : adjustedHorizontalPosition + width !== horizontalPosition + width
            ? width + horizontalPosition
            : width;

    if (horizontalPosition >= 100 || adjustedWidth <= 0) {
        return {
            [direction]: 0,
            width: 0,
            display: 'none'
        };
    } else if (horizontalPosition < 0) {
        return {
            [direction]: 0,
            width: `${adjustedWidth}%`
        };
    } else {
        return {
            [direction]: `${adjustedHorizontalPosition}%`,
            width: `${adjustedWidth}%`,
            display: horizontalPosition > 100 ? 'none' : undefined
        };
    }
};
