import styled from '@emotion/styled';
import { Vedtaksperiode, VedtaksperiodeStatus } from './types';

interface PeriodeProps extends Partial<Vedtaksperiode> {
    avkuttet: boolean;
    posisjonFraVenstre: number;
    bredde: number;
}

const periodeHeight = 24;

const venterFill = '#e7e9e9';
const venterBorder = '#59514b';
const utbetalingFill = '#cde7d8';
const utbetalingBorder = '#285835';
const oppgaverFill = '#ffe9cc';
const oppgaverBorder = '#654a28';
const avslagFill = '#f1d8d4';
const avslagBorder = '#70392d';

const ikonUtbetalt =
    "background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14px' height='14px' viewBox='0 0 24 24' enable-background='new 0 0 24 24' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M4.5,13.563h-4c-0.276,0-0.5,0.224-0.5,0.5v7.5c0,0.276,0.224,0.5,0.5,0.5h4c0.275,0,0.5-0.224,0.5-0.5v-7.5%0AC5,13.787,4.775,13.563,4.5,13.563z'/%3E%3Cpath d='M23.854,17.709c-1.174-1.173-2.187-1.5-3.512-1.121l-3.008,0.999c0.026,0.157,0.041,0.316,0.041,0.476%0Ac0,0.64-0.208,1.242-0.585,1.695c-0.438,0.526-1.058,0.805-1.79,0.805h-5c-0.276,0-0.5-0.224-0.5-0.5c0-0.276,0.224-0.5,0.5-0.5h5%0Ac0.432,0,0.775-0.15,1.021-0.445c0.225-0.27,0.354-0.654,0.354-1.055c0-0.558-0.29-1.5-1.375-1.5h-2.798H12%0Ac-0.133,0-0.26-0.053-0.354-0.146c-0.459-0.459-1.854-1.854-4.146-1.854H6c-0.276,0-0.5,0.224-0.5,0.5v5.5%0Ac0,0.215,0.138,0.406,0.342,0.474c1.561,0.521,2.781,0.964,3.761,1.321c1.928,0.701,3.007,1.08,3.969,1.08%0Ac1.147,0,2.128-0.538,4.177-1.709c1.356-0.775,3.213-1.836,5.976-3.217c0.144-0.072,0.244-0.208,0.27-0.368%0AC24.019,17.985,23.967,17.823,23.854,17.709z'/%3E%3Cpath d='M17,7.563c1.93,0,3.5-1.57,3.5-3.5c0-1.931-1.57-3.5-3.5-3.5s-3.5,1.569-3.5,3.5C13.5,5.993,15.07,7.563,17,7.563z%0AM16.5,3.063c0-0.276,0.224-0.5,0.5-0.5c0.275,0,0.5,0.224,0.5,0.5v2c0,0.276-0.225,0.5-0.5,0.5c-0.276,0-0.5-0.224-0.5-0.5V3.063z%0A'/%3E%3Cpath d='M12.5,14.563c1.93,0,3.5-1.57,3.5-3.5c0-1.931-1.57-3.5-3.5-3.5S9,9.132,9,11.063C9,12.993,10.57,14.563,12.5,14.563z%0AM12,10.063c0-0.276,0.224-0.5,0.5-0.5c0.275,0,0.5,0.224,0.5,0.5v2c0,0.276-0.225,0.5-0.5,0.5c-0.276,0-0.5-0.224-0.5-0.5V10.063z%0A'/%3E%3C/g%3E%3C/svg%3E\");";

const ikonOppgave =
    'background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M.188%2023.212a.5.5%200%2000.601.601l6.467-1.516a.531.531%200%2000.122-.047l-5.625-5.626a.496.496%200%2000-.047.123L.188%2023.212zM22.032%207.626l-.708.706-5.655-5.659.708-.707zM20.62%209.038L8.1%2021.558l-5.657-5.657%2012.52-12.52zM22.741%206.916l.354-.354a2.502%202.502%200%20000-3.535L20.974.907a2.477%202.477%200%2000-1.768-.733%202.48%202.48%200%2000-1.768.733l-.354.353%205.657%205.656z%22%2F%3E%3C%2Fsvg%3E");';

const ikonVenter =
    "background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14px' height='14px' viewBox='0 0 24 24' enable-background='new 0 0 24 24' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M12,19.411c-0.553,0-1,0.448-1,1v2c0,0.553,0.447,1,1,1c0.551,0,1-0.447,1-1v-2C13,19.859,12.551,19.411,12,19.411z'/%3E%3Cpath d='M21.501,12.106l-2-0.004c-0.57,0.012-1.001,0.445-1.001,0.997c-0.002,0.554,0.445,1.002,0.998,1.003l2,0.004%0Ac0,0,0,0,0.002,0c0.551,0,0.998-0.446,1-0.999C22.5,12.557,22.054,12.107,21.501,12.106z'/%3E%3Cpath d='M12.023,0.589h-0.001c-0.551,0-0.999,0.446-1,0.997l-0.008,4c0,0.553,0.446,1.002,0.998,1.003c0.001,0,0.002,0,0.002,0%0Ac0.552,0,1-0.446,1-0.998l0.008-4C13.023,1.037,12.576,0.59,12.023,0.589z'/%3E%3Cpath d='M9.31,19.051c-0.511-0.215-1.095,0.027-1.309,0.538l-0.77,1.846c-0.212,0.51,0.029,1.096,0.538,1.308%0Ac0.127,0.053,0.256,0.077,0.385,0.077c0.393,0,0.763-0.23,0.924-0.616l0.769-1.846C10.06,19.849,9.82,19.262,9.31,19.051z'/%3E%3Cpath d='M15.975,19.605c-0.209-0.512-0.795-0.756-1.305-0.546c-0.511,0.21-0.755,0.794-0.545,1.306l0.759,1.849%0Ac0.159,0.386,0.532,0.621,0.925,0.621c0.126,0,0.255-0.024,0.379-0.075c0.511-0.211,0.754-0.795,0.545-1.307L15.975,19.605z'/%3E%3Cpath d='M4.498,14.074c0,0,0,0,0.002,0c0.551,0,0.998-0.446,1-0.998c0-0.553-0.446-1.002-0.998-1.002l-2-0.005H2.5%0Ac-0.552,0-1,0.446-1,0.999c-0.002,0.551,0.445,1.001,0.998,1.001L4.498,14.074z'/%3E%3Cpath d='M18.009,10.611c0.159,0.388,0.532,0.621,0.925,0.621c0.127,0,0.255-0.025,0.38-0.076l1.85-0.763%0Ac0.51-0.211,0.754-0.795,0.543-1.305c-0.21-0.511-0.793-0.757-1.305-0.544l-1.85,0.762C18.042,9.518,17.799,10.102,18.009,10.611z'%0A/%3E%3Cpath d='M5.988,15.564c-0.21-0.512-0.793-0.758-1.305-0.545l-1.85,0.763c-0.511,0.211-0.754,0.796-0.544,1.306%0Ac0.159,0.386,0.532,0.619,0.925,0.619c0.127,0,0.256-0.024,0.381-0.075l1.85-0.763C5.956,16.658,6.199,16.074,5.988,15.564z'/%3E%3Cpath d='M18,17.695c-0.389-0.389-1.022-0.391-1.414-0.001c-0.391,0.39-0.393,1.021-0.002,1.413l1.41,1.418%0Ac0.196,0.194,0.453,0.294,0.709,0.294c0.256,0,0.51-0.099,0.706-0.292c0.392-0.391,0.392-1.023,0.003-1.414L18,17.695z'/%3E%3Cpath d='M16.604,8.501c0.195,0.196,0.452,0.294,0.709,0.294c0.255,0,0.511-0.097,0.706-0.292l1.417-1.412%0Ac0.391-0.389,0.393-1.021,0.002-1.413c-0.39-0.392-1.022-0.392-1.415-0.004l-1.416,1.412C16.215,7.477,16.215,8.109,16.604,8.501z'%0A/%3E%3Cpath d='M14.498,7.089c0.126,0.052,0.256,0.076,0.384,0.076c0.391,0,0.765-0.232,0.923-0.616l0.769-1.847%0Ac0.213-0.511-0.029-1.095-0.539-1.308c-0.51-0.213-1.096,0.029-1.307,0.538l-0.769,1.849C13.747,6.29,13.988,6.876,14.498,7.089z'%0A/%3E%3Cpath d='M9.305,3.924C9.093,3.412,8.509,3.166,7.999,3.381c-0.511,0.21-0.754,0.795-0.543,1.306l0.763,1.849%0AC8.377,6.92,8.75,7.153,9.143,7.153c0.126,0,0.256-0.024,0.38-0.075c0.512-0.21,0.754-0.796,0.544-1.306L9.305,3.924z'/%3E%3Cpath d='M5.998,8.481c0.195,0.196,0.452,0.293,0.708,0.293c0.255,0,0.511-0.096,0.707-0.291C7.803,8.094,7.805,7.46,7.414,7.069%0AL6.003,5.652C5.613,5.261,4.98,5.26,4.588,5.648C4.197,6.039,4.196,6.672,4.586,7.063L5.998,8.481z'/%3E%3Cpath d='M7.394,17.677c-0.391-0.392-1.023-0.394-1.414-0.003l-1.418,1.411c-0.391,0.389-0.392,1.022-0.002,1.414%0Ac0.195,0.195,0.452,0.294,0.709,0.294c0.253,0,0.51-0.098,0.705-0.291l1.417-1.411C7.782,18.701,7.783,18.066,7.394,17.677z'/%3E%3Cpath d='M21.153,15.816l-1.847-0.768c-0.51-0.213-1.096,0.029-1.307,0.537c-0.213,0.512,0.028,1.096,0.538,1.309l1.846,0.77%0Ac0.125,0.052,0.256,0.076,0.384,0.076c0.392,0,0.763-0.23,0.923-0.614C21.904,16.615,21.663,16.03,21.153,15.816z'/%3E%3Cpath d='M2.843,10.359l1.848,0.769c0.125,0.053,0.256,0.077,0.384,0.077c0.392,0,0.763-0.231,0.922-0.616%0Ac0.213-0.511-0.028-1.095-0.538-1.308l-1.846-0.77c-0.51-0.211-1.096,0.028-1.308,0.54C2.093,9.561,2.335,10.146,2.843,10.359z'/%3E%3C/g%3E%3C/svg%3E\");";

const ikonAvslag =
    "background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14px' height='14px' viewBox='0 0 24 24' enable-background='new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='M11.499,0C5.17,0,0.012,5.148,0,11.477c-0.006,3.072,1.184,5.962,3.352,8.139c2.168,2.176,5.054,3.378,8.126,3.384H11.5%0Ac6.328,0,11.487-5.149,11.5-11.479C23.012,5.181,17.863,0.012,11.499,0z M11.5,22.5L11.5,22.5L11.5,22.5L11.5,22.5z M16.088,15.398%0Ac0.194,0.195,0.193,0.512-0.002,0.707c-0.098,0.098-0.225,0.146-0.353,0.146c-0.127,0-0.256-0.049-0.354-0.146l-3.882-3.898%0Al-3.896,3.882c-0.098,0.098-0.226,0.146-0.354,0.146c-0.128,0-0.255-0.049-0.353-0.146c-0.195-0.196-0.195-0.513,0.001-0.707%0Al3.897-3.882L6.91,7.602C6.715,7.406,6.716,7.09,6.912,6.896C7.107,6.699,7.424,6.7,7.619,6.897l3.881,3.897l3.896-3.881%0Ac0.195-0.195,0.513-0.195,0.707,0.001c0.195,0.195,0.195,0.512-0.001,0.707l-3.896,3.882L16.088,15.398z'/%3E%3C/svg%3E\");";

const ikon = (props: PeriodeProps) => {
    switch (props.status) {
        case VedtaksperiodeStatus.Utbetalt:
            return `
                transform: translateY(-52%);
                ${ikonUtbetalt}
            `;
        case VedtaksperiodeStatus.Oppgaver:
            return `
                transform: translateY(-52%);
                ${ikonOppgave}
            `;
        case VedtaksperiodeStatus.Avslag:
            return ikonAvslag;
        case VedtaksperiodeStatus.TilUtbetaling:
        case VedtaksperiodeStatus.Venter:
        default:
            return `
                transform: translateY(-55%);
                ${ikonVenter}
            `;
    }
};

const colors = (props: PeriodeProps) => {
    const boxShadow = (color: string) => `inset 0 0 0 1px ${color}`;
    switch (props.status) {
        case VedtaksperiodeStatus.TilUtbetaling:
        case VedtaksperiodeStatus.Utbetalt:
            return `
                background: ${utbetalingFill};
                box-shadow: ${boxShadow(utbetalingBorder)};
                &:hover{background: #9bd0b0};
            `;
        case VedtaksperiodeStatus.Oppgaver:
            return `
                background: ${oppgaverFill};
                box-shadow: ${boxShadow(oppgaverBorder)};
                &:hover{background: #ffd399};
            `;
        case VedtaksperiodeStatus.Avslag:
            return `
                background: ${avslagFill};
                box-shadow: ${boxShadow(avslagBorder)};
                &:hover{background: #e3b0a8};
            `;
        case VedtaksperiodeStatus.Venter:
        default:
            return `
                background: ${venterFill};
                box-shadow: ${boxShadow(venterBorder)};
                &:hover{background: #c3c3c3};
            `;
    }
};

export const Rad = styled('div')`
    display: flex;
    margin: 0.25rem 0;
`;

export const StyledVedtaksperiodevelger = styled('div')`
    width: 15rem;
`;

export const Inntektskilde = styled('p')`
    font-size: 14px;
    margin: 0;
    width: 15rem;
`;

export const Perioder = styled('div')`
    flex: 1;
    height: ${periodeHeight}px;
    display: flex;
    align-items: center;
    position: relative;

    > hr {
        margin: 0;
        height: 0;
        width: 100%;
        border: none;
        border-top: 3px solid #e7e9e9;
    }
`;

export const Periode = styled('button')`
    height: ${periodeHeight}px;
    min-width: ${periodeHeight}px;
    border-radius: ${periodeHeight / 2}px;
    position: absolute;
    cursor: pointer;
    border: none;
    ${colors};

    &:active,
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px #0067c5;
    }

    &:before {
        content: '';
        height: 14px;
        width: 14px;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        ${ikon};
    }

    ${(props: PeriodeProps) =>
        props.avkuttet &&
        `
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    `}

    ${(periode: PeriodeProps) => `
        left: ${periode.posisjonFraVenstre}%;
        width: ${periode.bredde}%;
    `}

    ${(periode: PeriodeProps) =>
        periode.bredde < 3 &&
        `
        --størrelse: 8px;
        height: var(--størrelse);
        width: var(--størrelse);
        min-width: var(--størrelse);
        padding: 0;
        &:before {
            display: none;
        }
    `}
`;
