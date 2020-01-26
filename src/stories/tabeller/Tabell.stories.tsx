import * as React from "react";
import Tabell from '../components/Tabell/Tabell';

export default { title: 'Tabeller/Tabell' }

export const medToKolonner = () =>
    <Tabell columns={2} header>
        <p>Dato</p><p>Gradering</p>
        <p>19.02.2019</p><p>100%</p>
        <p>19.02.2019</p><p>100%</p>
        <p>19.02.2019</p><p>100%</p>
        <p>19.02.2019</p><p>100%</p>
    </Tabell>;

export const medTreKolonner = () =>
    <Tabell columns={3} header>
        <p>Dato</p><p>Gradering</p><p>Refusjon</p>
        <p>19.02.2019</p><p>100%</p><p>Ja</p>
        <p>19.02.2019</p><p>100%</p><p>Ja</p>
        <p>19.02.2019</p><p>100%</p><p>Ja</p>
        <p>19.02.2019</p><p>100%</p><p>Ja</p>
    </Tabell>;

export const medFooter = () =>
    <Tabell columns={3} header footer>
        <p>Dato</p><p>Gradering</p><p>Dagsats</p>
        <p>19.02.2019</p><p>100%</p><p>-</p>
        <p>19.02.2019</p><p>100%</p><p>-</p>
        <p>19.02.2019</p><p>100%</p><p>1234</p>
        <p>19.02.2019</p><p>100%</p><p>1234</p>
        <p>Sum</p><p></p><p>2468</p>
    </Tabell>;
