import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';

export interface PeriodObject {
    id: string;
    start: Date;
    end: Date;
}

export interface InternalPeriodObject {
    id: string;
    start: Dayjs;
    end: Dayjs;
}

export interface PositionedPeriod {
    id: string;
    style: CSSProperties;
    start: Dayjs;
    end: Dayjs;
}

export interface AxisLabel {
    horizontalPosition: number;
    direction: 'left' | 'right';
    width: number;
    label: string;
    date: Date;
}

export interface Pin {
    /**
     * Dato objektet gjelder for og datoen den skal plasseres på i tidslinja.
     */
    date: Date;
    /**
     * Innhold som rendres ved hover.
     */
    render?: ReactNode;

    /**
     * Egendefinerte stiler for objektet
     */
    style?: CSSProperties;
}
