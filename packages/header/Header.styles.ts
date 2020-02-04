import styled from '@emotion/styled';

const activeButtonColor = '#59514b';
const activeBorderColor = '#ffa733';

const headerHeightInPixels = 50;

const headerTekst = `
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    font-weight: 600;
    text-align: left;
    color: #fff;
    padding: 0;
    margin: 0;
`;

const commonButtonStyles = `
    border: none;
    background: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    
    &:hover {
        background: ${activeButtonColor};
    }
    
    &:active {
        background: none;
    }
    
    &:focus, &:active {
        outline: none;
        box-shadow: inset 0 0 0 3px ${activeBorderColor};
    }
`;

interface RadProps {
    gap?: boolean;
}

export const Rad = styled('div')`
    display: flex;
    align-items: center;
    ${(props: RadProps) =>
        props.gap &&
        `
        > *:not(:last-child) {
            margin-right: 1rem;
        }
    `}
`;

export const Kolonne = styled('div')`
    display: flex;
    flex-direction: column;
`;

export const TekstNormal = styled('p')`
    ${headerTekst};
    font-size: 15px;
`;

export const TekstLiten = styled('p')`
    ${headerTekst};
    font-size: 12px;
`;

export const Systemknapp = styled('button')`
    width: ${headerHeightInPixels}px;
    height: ${headerHeightInPixels}px;
    ${commonButtonStyles}
`;

const chevron = (retning: 'opp' | 'ned' = 'ned') => {
    const horizontalPosition = 0.75;
    const horizontalOffset = 0.375;

    return `
        &:before, &:after {
            transition: transform 0.2s;
        }
        
        &:before {
            position: absolute;
            content: '';
            right: ${horizontalPosition}rem;
            width: 0.5rem;
            top: 50%;
            border-radius: 2px;
            border: 1px solid #fff;
            transform: rotate(${retning === 'ned' ? -45 : 45}deg);
        }
    
        &:after {
            position: absolute;
            content: '';
            right: ${horizontalPosition + horizontalOffset}rem;
            width: 0.5rem;
            top: 50%;
            border-radius: 2px;
            border: 1px solid #fff;
            transform: rotate(${retning === 'ned' ? 45 : -45}deg);
        }
    `;
};

interface BrukerknappProps {
    åpen?: boolean;
}

export const Brukerknapp = styled('button')`
    position: relative;
    justify-self: flex-end;
    padding: 0 2.5rem 0 1rem;
    margin-right: -1rem;
    height: ${headerHeightInPixels}px;
    ${commonButtonStyles};
    ${(props: BrukerknappProps) => (props.åpen ? chevron('opp') : chevron('ned'))};

    > *:first-child > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

export const Avdeler = styled('div')`
    width: 1px;
    height: 100%;
    background: #78706a;
`;

export const Tittel = styled('h1')`
    color: #fff;
    font-size: 18px;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
`;

export const HeaderBar = styled('div')`
    display: flex;
    justify-content: space-between;
    max-width: 100vw;
    height: ${headerHeightInPixels}px;
    padding: 0 1.5rem;
    background: #3e3832;

    > *:first-child > *:not(:last-child) {
        margin-right: 1.5rem;
    }
`;
