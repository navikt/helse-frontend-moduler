import React from 'react';
import Tabell, { Body, Footer, Header } from '../../components/Tabell/Tabell';

export default { title: 'Tabeller/Tabell' };

export const medToKolonner = () => (
    <Tabell>
        <Header>
            <p>Dato</p>
            <p>Gradering</p>
        </Header>
        <Body>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
            </>
            <>
                <p>20.02.2019</p>
                <p>100%</p>
            </>
            <>
                <p>21.02.2019</p>
                <p>100%</p>
            </>
            <>
                <p>22.02.2019</p>
                <p>100%</p>
            </>
        </Body>
    </Tabell>
);

export const medTreKolonner = () => (
    <Tabell>
        <Header>
            <p>Dato</p>
            <p>Gradering</p>
            <p>Refusjon</p>
        </Header>
        <Body>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </>
            <>
                <p>20.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </>
            <>
                <p>21.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </>
            <>
                <p>22.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </>
        </Body>
    </Tabell>
);

export const medFooter = () => (
    <Tabell>
        <Header>
            <p>Dato</p>
            <p>Gradering</p>
            <p>Dagsats</p>
        </Header>
        <Body>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>-</p>
            </>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>-</p>
            </>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>1234</p>
            </>
            <>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>1234</p>
            </>
        </Body>
        <Footer>
            <p>Sum</p>
            <p></p>
            <p>2468</p>
        </Footer>
    </Tabell>
);
