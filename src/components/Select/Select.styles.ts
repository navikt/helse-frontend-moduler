import { css } from '@emotion/core'

const navOverride = `
    .skjemaelement__input {
        border: none;
    }
`;

export const selectStyle = css`
    border-radius: 2px;
    border: 2px solid rgb(0, 103, 197);
    ${navOverride}
`