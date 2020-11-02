import React from 'react';
import { Hendelse, Hendelsetype, Logg } from './src';
import { IkonHistorikk } from './src/icons/IkonHistorikk';
import { IkonDokumenter } from './src/icons/IkonDokumenter';
import { IkonDialog } from './src/icons/IkonDialog';
import { LoggProps } from './src/Logg';
import styled from '@emotion/styled';

export default {
    title: 'Logg',
    component: Logg,
    argTypes: {
        filtere: {
            defaultValue: [
                {
                    filterFunction: (_: Hendelse) => true,
                    renderProp: <IkonHistorikk />
                },
                {
                    filterFunction: (hendelse: Hendelse) => hendelse.type === Hendelsetype.Dokumenter,
                    renderProp: <IkonDokumenter />
                },
                {
                    filterFunction: (hendelse: Hendelse) => hendelse.type === Hendelsetype.Meldinger,
                    renderProp: <IkonDialog />
                }
            ]
        },
        hendelser: {
            defaultValue: [
                {
                    navn: 'Søknad mottatt',
                    dato: '17.05.2019',
                    type: Hendelsetype.Dokumenter
                },
                {
                    navn: 'Inntektsmelding mottatt',
                    dato: '17.05.2019',
                    type: Hendelsetype.Dokumenter
                },
                {
                    navn: 'Sykmelding mottatt',
                    dato: '09.05.2019',
                    type: Hendelsetype.Dokumenter,
                    className: 'med-ikon'
                }
            ]
        }
    }
};

const Container = styled.div`
    .med-ikon:before {
        position: absolute;
        content: '';
        width: 30px;
        height: 18px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='18' viewBox='0 0 30 18' fill='none'%3E%3Cpath d='M8.808 14.168C8.164 14.168 7.56667 14.0467 7.016 13.804C6.46533 13.5613 5.98933 13.23 5.588 12.81L6.288 11.998C6.61467 12.3433 6.99733 12.6233 7.436 12.838C7.884 13.0433 8.346 13.146 8.822 13.146C9.42867 13.146 9.9 13.0107 10.236 12.74C10.572 12.46 10.74 12.096 10.74 11.648C10.74 11.4147 10.698 11.2187 10.614 11.06C10.5393 10.892 10.432 10.752 10.292 10.64C10.1613 10.5187 10.0027 10.4113 9.816 10.318C9.62933 10.2247 9.42867 10.1267 9.214 10.024L7.898 9.45C7.68333 9.35667 7.464 9.24467 7.24 9.114C7.016 8.98333 6.81533 8.82467 6.638 8.638C6.46067 8.45133 6.316 8.232 6.204 7.98C6.092 7.71867 6.036 7.42 6.036 7.084C6.036 6.73867 6.106 6.41667 6.246 6.118C6.39533 5.81933 6.596 5.56267 6.848 5.348C7.10933 5.124 7.41267 4.95133 7.758 4.83C8.11267 4.70867 8.5 4.648 8.92 4.648C9.47067 4.648 9.97933 4.75533 10.446 4.97C10.9127 5.17533 11.3093 5.446 11.636 5.782L11.006 6.538C10.726 6.26733 10.4133 6.05733 10.068 5.908C9.732 5.74933 9.34933 5.67 8.92 5.67C8.40667 5.67 7.99133 5.79133 7.674 6.034C7.366 6.26733 7.212 6.594 7.212 7.014C7.212 7.238 7.254 7.42933 7.338 7.588C7.43133 7.73733 7.55267 7.87267 7.702 7.994C7.85133 8.106 8.01467 8.20867 8.192 8.302C8.36933 8.386 8.55133 8.46533 8.738 8.54L10.04 9.1C10.3013 9.212 10.5487 9.34267 10.782 9.492C11.0153 9.632 11.216 9.8 11.384 9.996C11.552 10.1827 11.6827 10.4067 11.776 10.668C11.8787 10.92 11.93 11.214 11.93 11.55C11.93 11.914 11.8553 12.2547 11.706 12.572C11.566 12.8893 11.3607 13.1693 11.09 13.412C10.8193 13.6453 10.4927 13.832 10.11 13.972C9.72733 14.1027 9.29333 14.168 8.808 14.168ZM13.9385 14V4.816H15.3385L17.1025 9.716C17.2145 10.0333 17.3218 10.3553 17.4245 10.682C17.5365 10.9993 17.6485 11.3167 17.7605 11.634H17.8165C17.9285 11.3167 18.0312 10.9993 18.1245 10.682C18.2272 10.3553 18.3345 10.0333 18.4465 9.716L20.1825 4.816H21.5965V14H20.5045V8.946C20.5045 8.53533 20.5232 8.08267 20.5605 7.588C20.5978 7.09333 20.6305 6.64067 20.6585 6.23H20.6025L19.8745 8.316L18.1385 13.076H17.3685L15.6325 8.316L14.9045 6.23H14.8485C14.8765 6.64067 14.9045 7.09333 14.9325 7.588C14.9698 8.08267 14.9885 8.53533 14.9885 8.946V14H13.9385Z' fill='%2359514B'/%3E%3Cpath d='M5 1.5H25V0.5H5V1.5ZM28.5 5V13H29.5V5H28.5ZM25 16.5H5V17.5H25V16.5ZM1.5 13V5H0.5V13H1.5ZM5 16.5C3.067 16.5 1.5 14.933 1.5 13H0.5C0.5 15.4853 2.51472 17.5 5 17.5V16.5ZM28.5 13C28.5 14.933 26.933 16.5 25 16.5V17.5C27.4853 17.5 29.5 15.4853 29.5 13H28.5ZM25 1.5C26.933 1.5 28.5 3.067 28.5 5H29.5C29.5 2.51472 27.4853 0.5 25 0.5V1.5ZM5 0.5C2.51472 0.5 0.5 2.51472 0.5 5H1.5C1.5 3.067 3.067 1.5 5 1.5V0.5Z' fill='%233E3832'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        left: 0;
        top: 18px;
    }
`;

export const Basic = (args: LoggProps) => (
    <Container>
        <Logg {...args} />
    </Container>
);
Basic.storyName = 'Logg';
