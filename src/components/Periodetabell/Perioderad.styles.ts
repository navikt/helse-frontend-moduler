import styled from '@emotion/styled';
import { interactiveElement } from './input/mixins';

interface AnchorProps {
    href?: string;
}

const blå = '#0067c5';
const blåMørk = '#005B82';

const cellContent = `
  display: flex;
  align-items: center;
  margin: 0;
`;

export const Status = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -1rem !important;
`;

export const Sykmeldingsperiode = styled('div')`
    display: flex;
    align-items: center;

    > * {
        ${cellContent}
        &:nth-child(1) {
            width: 10rem;
        }
        &:nth-child(2) {
            width: 2.25rem;
        }
        &:nth-child(3) {
            width: 9.5rem;
            margin-right: 0.5rem;
        }
        &:nth-child(4) {
            width: 3rem;
        }
    }
`;

export const Gradering = styled('div')`
    display: flex;
    align-items: center;

    > *:nth-child(1) {
        width: 4.5rem;
        margin-right: 0.5rem;
    }

    > input:nth-child(1) {
        width: calc(4rem + 1px);
        border: 1px solid #78706a;
        border-radius: 2px;
        height: 1.125rem;
        padding-left: 0.25rem;

        ${interactiveElement}
    }
`;

export const Oppgavelenke = styled('a')`
    color: ${blå};
    margin-left: 3rem;
    &:hover {
        text-decoration: none;
    }
`;

const ikonEksternLenke = (color: string = blå) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 -1 32 32">
      <g stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" fill="none">
          <path d="M16.513.5h7v7M23.513.5l-16 16" />
      </g>
  </svg>
`;

export const Kildelenke = styled('a')`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    line-height: 1rem;
    padding: 0 1px 1px 1px;
    min-width: 1.25rem;
    height: 1rem;
    border-radius: 4px;
    text-decoration: none;

    ${(props: AnchorProps) =>
        props.href
            ? `
        color: ${blå};
        box-shadow: 0 0 0 1px ${blå};
        width: 1.75rem;
        
        &:hover {
          background: ${blå};
          color: white;
          &:after {
            background-image: url("data:image/svg+xml;utf8, ${encodeURIComponent(ikonEksternLenke('white'))}");
          }
        }
        
        &:active {
          background: ${blåMørk};
        }
        
        &:after {
          content: '';
          width: 8px;
          height: 8px;
          background-image: url("data:image/svg+xml;utf8, ${encodeURIComponent(ikonEksternLenke())}");
        }
      `
            : `
        color: #59514b;
        box-shadow: 0 0 0 1px #59514b;
      `}

    ${interactiveElement}
`;
