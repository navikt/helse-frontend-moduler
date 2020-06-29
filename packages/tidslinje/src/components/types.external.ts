import { ReactNode } from 'react';

export interface EnkelPeriode {
    /**
     * Startdato for perioden, mao. periodens høyre kant.
     */
    fom: Date;
    /**
     * Sluttdato for perioden, mao. periodens venstre kant.
     */
    tom: Date;
}

export interface Periode extends EnkelPeriode {
    /**
     * Brukes for å style/fargesette periodeknappene og indikerer status for perioden.
     */
    status: 'suksess' | 'feil' | 'advarsel' | 'inaktiv' | 'ukjent';
    /**
     * Brukes for å unikt identifisere perioden, f.eks. om du ønsker å identifisere
     * perioden du klikker på med `onSelectPeriode`-funksjonen.
     */
    id?: string;
    /**
     * Gjør at periodeknappen ikke kaller `onSelectPeriode` når den klikkes.
     */
    disabled?: boolean;
    /**
     * Legges på periodeknappen og kan brukes for å stilsette knappen, f.eks. om
     * man ønsker forskjellige ikoner på knappene for å visuelt identifisere
     * forskjellige typer perioder.
     */
    className?: string;
    /**
     * Dersom perioden har `disabled` satt til true kan denne brukes for å informere
     * om hvorfor perioden er inaktiv i en tooltip over periodeknappen.
     */
    disabledLabel?: ReactNode;
}
