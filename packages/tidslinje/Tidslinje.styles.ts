import styled from '@emotion/styled';

const font = (color: string) => `
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    color: ${color};
`;

export const TidslinjeContainer = styled('div')`
    ${font('#3e3832')};
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem;
`;

interface UtsnittsknappProps {
    selected?: boolean;
}

export const Footer = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
`;

export const Utsnittsknapp = styled('button')`
    ${font('#0067c5')};
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;

    &:active,
    &:focus {
        outline: none;
    }

    &:hover,
    &:focus {
        text-decoration: underline;
    }

    ${(props: UtsnittsknappProps) => props.selected && 'text-decoration: underline'};
`;
