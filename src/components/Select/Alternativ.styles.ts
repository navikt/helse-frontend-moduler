/** @jsx jsx */
import styled from '@emotion/styled';

export const Body = styled.div`
    display: flex;
    align-items: center;

    padding: 0.5rem;

    border-bottom: 1px solid #c6c2bf;

    background-color: white;

    &:hover {
        background-color: #0067c5;
        color: white;
        cursor: pointer;
        border-bottom: 1px solid #0067c5;
    }

    &:focus,
    &:active {
        outline: 3px solid #254b6d;
        box-shadow: 0 0 0 3px #254b6d;
    }
`;
