export enum Hendelsetype {
    Historikk,
    Meldinger,
    Dokumenter
}

export interface Hendelse {
    id: string;
    dato: string;
    navn: string;
    type: Hendelsetype;
    beskrivelse?: string;
}
