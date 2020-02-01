import styled from '@emotion/styled';

interface TableRowProps {
    disabled?: boolean;
    background?: string;
}

const greyDark = '#3e3832';
const greyNormal = '#59514b';
const greyLight = '#c6c2bf';

export const thead = `
    thead tr th {
        border-bottom: 1px solid ${greyNormal};
        text-align: left;
        padding: 0;

        > * {
            font-weight: 600;
            padding: 0.75rem 1rem;
            margin: 0;
        }
    }
`;

export const tfoot = `
    tfoot tr td {
        border-bottom: 1px solid ${greyNormal};
        padding: 0.375rem 1rem;
        font-weight: 600;

        > * {
            margin: 0;
        }
    }
`;

export const tbody = `
    tbody tr td {
        height: 2rem;
        border-bottom: 1px solid ${greyLight};
        padding: 0 1rem;

        > * {
            margin: 0;
        }
    }
`;

export const Table = styled('table')`
    font-family: 'Source Sans Pro', Arial, sans-serif;
    border-collapse: collapse;
    align-self: stretch;
    color: ${greyDark};
    ${thead}
    ${tbody}
    ${tfoot}
    
    tr > td:last-child {
        width: 100%;
    }
`;

export const TableRow = styled('tr')`
    ${(props: TableRowProps) =>
        props.disabled
            ? `background: repeating-linear-gradient(
            110deg,
            #e7e9e9,
            #e7e9e9 1px,
            #ffffff 1px,
            #ffffff 5px
          );`
            : `background: ${props.background};`}
`;
