/** @jsx jsx */
import styled from '@emotion/styled';

export const Element = styled.li`
    display: flex;
    align-items: center;

    padding: 0.5rem;

    border-bottom: 1px solid #c6c2bf;
    border-left: 1px solid #c6c2bf;
    border-right: 1px solid #c6c2bf;

    background-color: white;

    &:hover {
        background-color: #0067c5;
        color: white;
        cursor: pointer;
        border-bottom: 1px solid #0067c5;
        border-left: 1px solid #0067c5;
        border-right: 1px solid #0067c5;
    }

    &:focus,
    &:active {
        outline: 3px solid #254b6d;
        box-shadow: 0 0 0 3px #254b6d;
    }
`;

export const Container = styled.ul`
    max-height: 200px;
    overflow: auto;
    position: absolute;
    z-index: 5;
    list-style: none;

    width: calc(100% - 2px);

    margin: 0 2px;
    padding: 0;

    border-radius: 2px;

    box-shadow: 0 0.05rem 0.25rem 0.125rem rgba(0, 0, 0, 0.08);
`;
