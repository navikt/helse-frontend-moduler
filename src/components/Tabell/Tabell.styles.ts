import styled from "@emotion/styled";

interface ContainerProps {
  columns: number;
  header?: boolean;
  footer?: boolean;
}

const greyDark = "#3e3832";
const greyNormal = "#59514b";
const greyLight = "#c6c2bf";

const header = `
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${greyNormal};
`;

const footer = `
  font-weight: 600;
  border-bottom: 1px solid ${greyNormal};
`;

const cell = `
  border-bottom: 1px solid ${greyLight};
  padding: 0.375rem 1rem;
  margin: 0;
`;

export const Container = styled("div")`
  font-family: "Source Sans Pro", Arial, sans-serif;
  color: ${greyDark};
  display: grid;
  grid-template-columns: repeat(
    ${(props: ContainerProps) => props.columns},
    max-content
  );

  > * {
    ${cell}
  }

  > *:nth-child(-n + ${(props: ContainerProps) => props.columns}) {
    ${(props: ContainerProps) => (props.header ? header : "")}
  }
  
  > *:nth-last-child(-n + ${(props: ContainerProps) => props.columns}) {
    ${(props: ContainerProps) => (props.footer ? footer : "")}
  }
`;
