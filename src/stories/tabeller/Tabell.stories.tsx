import React from 'react'
import Tabell, { Body, Footer, Header, Rad } from '../../components/Tabell/Tabell'

export default { title: 'Tabeller/Tabell' };

export const medToKolonner = () => (
    <Tabell>
        <Header>
            <p>Dato</p>
            <p>Gradering</p>
        </Header>
        <Body>
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
            </Rad>
            <Rad>
                <p>20.02.2019</p>
                <p>100%</p>
            </Rad>
            <Rad>
                <p>21.02.2019</p>
                <p>100%</p>
            </Rad>
            <Rad>
                <p>22.02.2019</p>
                <p>100%</p>
            </Rad>
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
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </Rad>
            <Rad>
                <p>20.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </Rad>
            <Rad>
                <p>21.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </Rad>
            <Rad>
                <p>22.02.2019</p>
                <p>100%</p>
                <p>Ja</p>
            </Rad>
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
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>-</p>
            </Rad>
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>-</p>
            </Rad>
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>1234</p>
            </Rad>
            <Rad>
                <p>19.02.2019</p>
                <p>100%</p>
                <p>1234</p>
            </Rad>
        </Body>
        <Footer>
            <p>Sum</p>
            <p></p>
            <p>2468</p>
        </Footer>
    </Tabell>
);
