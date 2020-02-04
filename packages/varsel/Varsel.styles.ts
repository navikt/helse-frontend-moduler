import styled from '@emotion/styled';
import { Varseltype } from './Varsel';

interface VarselContainerProps {
    type?: Varseltype;
}

const linkStyle = `
    a { 
        color: #0067C5;
        &:hover {
            text-decoration: none;
        } 
    }
`;

const textStyle = `
    > p:nth-child(2) {
        margin: 0.5rem 0;
        font-weight: 600;
    }
`;

const advarselStyle = `
    border-color: #8b5c1e;
    background: #ffe9cc;
`;

const infoStyle = `
    border-color: #194d62;
    background: #c2eaf7;
`;

const suksessStyle = `
    border-color: #1c6937;
    background: #cde7d8;
`;

const feilStyle = `
    border-color: #88392b;
    background: #e3b0a8;
`;

export const VarselContainer = styled('div')`
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    min-height: 2.5rem;
    min-width: min-content;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    
    > *:not(:last-child) {
        margin-right: 1rem !important;
    }
    
    > svg {
        min-width: max-content;
    }

    ${textStyle}
    ${linkStyle}

    ${(props: VarselContainerProps) => {
        switch (props.type) {
            case 'suksess':
                return suksessStyle;
            case 'advarsel':
                return advarselStyle;
            case 'feil':
                return feilStyle;
            case 'info':
            default:
                return infoStyle;
        }
    }}
`;
