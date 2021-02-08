import { Dayjs } from 'dayjs';
import { CSSProperties } from 'react';

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
