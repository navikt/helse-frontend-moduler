export type Inntektstype = 'arbeidsgiver' | 'ytelse';

export interface Vedtaksperiode {
    fom: string;
    tom: string;
    status: VedtaksperiodeStatus;
}

export interface EnkelTidslinje {
    id: string;
    inntektsnavn: string;
    inntektstype: Inntektstype;
    vedtaksperioder: Vedtaksperiode[];
}

export interface SammensattTidslinje {
    tidslinjer: EnkelTidslinje[];
}

export enum Utsnitt {
    HalvtÅr = 6,
    EttÅr = 12,
    TreÅr = 36
}

export enum VedtaksperiodeStatus {
    TilUtbetaling,
    Utbetalt,
    Venter,
    Oppgaver,
    Avslag
}
