import { ReactNode } from 'react';

export type Hendelsefilter = (hendelse: Hendelse) => boolean;

export interface Filter {
    /**
     * Brukes for å filtrere hendelsene i loggen. Man kan f.eks. sortere på hendelse.type, hendelse.status,
     * eller alle hendelser innen et visst tidsrom.
     */
    filterFunction: (hendelse: Hendelse) => boolean;
    /**
     * Dette er det som rendres i filterknappen øverst i loggen.
     */
    renderProp: ReactNode;
    /**
     * Bestemmer om filterknappen er disabled.
     */
    disabled?: boolean;
}

export enum Hendelsetype {
    Historikk,
    Meldinger,
    Dokumenter
}

export interface Hendelse {
    /**
     * Navnet på hendelsen. Rendres øverst i meldingen.
     */
    navn: string;
    /**
     * Type som identifiserer hva slags hendelse/melding dette er. Kan brukes for å filtrere på hendelser.
     */
    type?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    /**
     * Rendres under navnet.
     */
    dato?: string;
    /**
     * Valgfri beskrivelse av meldingen. Rendres under navn og dato.
     */
    beskrivelse?: ReactNode;
    /**
     * Klassenavn som legges på li-elementet for hendelsen i listen.
     */
    className?: string;
}

export type HendelseMedId = Hendelse & { id: string };
