/** @jsx jsx */
import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #0067c5;
    width: max-content;
`;

export const Knapp = styled.button`
    display: inline-block;
    position: relative;

    height: 2rem;
    width: 100%;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-align: left;
    color: inherit;

    border: 2px solid #0067c5;
    border-radius: 2px;

    background-color: transparent;
    padding-right: 2.5rem;

    &:hover {
        background-color: #0067c5;
        color: #ffffff;
        cursor: pointer;
    }

    &:before {
        content: '';
        background-color: transparent;
        right: 2rem;
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
        box-shadow: 2px 2px 0 0 #0067c5;
        right: 1rem;
        transform: translateX(50%) rotate(45deg);
    }

    &:active {
        background-color: #005b82;
        color: #ffffff;
        border-color: #005b82;
    }

    &:focus {
        box-shadow: 0 0 0 3px #254b6d;
        outline: 0;
    }

    &:active,
    &:hover {
        &:after {
            box-shadow: 2px 2px 0 0 #fff;
        }

        &:before {
            border-color: #fff;
        }
    }
`;
