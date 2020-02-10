export const interactiveElement = `
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    transition: 
        box-shadow 0.2s,
        border-color 0.2s;

    &:hover {
        border-color: #0067c5;
    }

    &:focus {
        outline: none;
        border-color: #005B82;
        box-shadow: 0 0 0 3px #005B82;
    }
`;
