/** @jsx jsx */
import styled from '@emotion/styled';

export const SelectContainer = styled.div`
    position: relative;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #0067c5;
    width: 400px;
`;

export const Knapp = styled.button`
    display: inline-block;
    position: relative;

    height: 32px;
    width: 100%;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-align: left;
    color: inherit;

    border: 2px solid #0067c5;
    border-radius: 2px;

    background-color: transparent;

    &:hover {
        background-color: #0067c5;
        color: #ffffff;
        cursor: pointer;
    }

    &:before {
        content: '';
        background-color: transparent;

        right: 2.25rem;

        border-color: #0067c5;
        border-right: 2px solid;

        position: absolute;
        top: 0;
        bottom: 0;
    }

    &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: transparent;

        border-color: #0067c5;
        border-bottom: 2px solid;
        border-right: 2px solid;
        border-radius: 2px;

        right: 0.75rem;
        transform: rotate(45deg);
    }
`;

export const Alternativ = styled.div`
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

export const AlternativContainer = styled.div`
    height: 100%;
    position: relative;

    margin: 0 2px;

    border: 1px solid #c6c2bf;
    border-radius: 2px;

    box-shadow: 0 0.05rem 0.25rem 0.125rem rgba(0, 0, 0, 0.08);
`;
