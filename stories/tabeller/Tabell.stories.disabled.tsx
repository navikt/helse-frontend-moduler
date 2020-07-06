import React from 'react';
import { Tabell, Body, Footer, Head, Rad } from '../../packages/tabell/src';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
    component: Tabell,
    title: 'Tabeller/Tabell',
    decorators: [withKnobs]
};

export const medToKolonner = () => (
    <Tabell>
        <Head>
            <p>Dato</p>
            <p>Gradering</p>
        </Head>
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
        <Head>
            <p>Dato</p>
            <p>Gradering</p>
            <p>Refusjon</p>
        </Head>
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
        <Head>
            <p>Dato</p>
            <p>Gradering</p>
            <p>Dagsats</p>
        </Head>
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

export const variabeltAntallKolonnerOgRader = () => {
    const rader = Array(number('Rader', 2)).fill(undefined);
    const kolonner = Array(number('Kolonner', 2)).fill(undefined);

    return (
        <Tabell>
            <Head>
                {kolonner.map((_, i) => {
                    const navn = `Kolonne_${i + 1}`;
                    return <p key={navn}>{navn}</p>;
                })}
            </Head>
            <Body>
                {rader.map((_, i) => (
                    <Rad key={i}>
                        {kolonner.map((_, j) => {
                            const navn = `(${i}, ${j})`;
                            return <p key={navn}>{navn}</p>;
                        })}
                    </Rad>
                ))}
            </Body>
        </Tabell>
    );
};
