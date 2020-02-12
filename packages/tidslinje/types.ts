export type Inntektstype = 'arbeidsgiver' | 'ytelse';

export interface Vedtaksperiode {
    id: string;
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

export enum Skalastørrelse {
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

export interface Skalapunkt {
    dato: string;
    navn: string;
}
