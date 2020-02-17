import styled from '@emotion/styled';
import { venstreMargin } from './common.styles';

const bakgrunnsfargeIntervallAktiv = '#e5f3ff';
const bakgrunnsfargeIntervallHover = '#f0f2f2';
const navBlå = '#0067c5';

interface DatointervallProps {
    posisjonFraVenstre: number;
    bredde: number;
    aktiv: boolean;
}

export const Datointervall = styled.button`
    position: absolute;
    height: 100%;
    border: none;
    background: none;
    mix-blend-mode: darken;
    ::-moz-focus-inner {
        border: 0;
    }

    ${(props: DatointervallProps) => `
        left: ${props.posisjonFraVenstre}%;
        width: ${props.bredde}%;
    `};

    ${(props: DatointervallProps) =>
        !props.aktiv &&
        `
        &:hover, &:focus {
            background: ${bakgrunnsfargeIntervallHover};
        }
    `}

    ${(props: DatointervallProps) =>
        props.aktiv &&
        `
        background: ${bakgrunnsfargeIntervallAktiv};
        border-left: 1px solid ${navBlå};
        border-right: 1px solid ${navBlå};
        
        &:before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: ${navBlå};
        }
        &:after {
            content: '';
            position: absolute;
            top: -3px;
            right: -3px;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: ${navBlå};
        }
    `};
`;

export const Container = styled.div`
    top: 0;
    right: 0;
    height: 100%;
    position: absolute;
    width: calc(100% - ${venstreMargin});
`;
