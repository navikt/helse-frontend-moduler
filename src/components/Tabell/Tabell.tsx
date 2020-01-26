import React, { ReactNode } from "react";
import { Container } from "./Tabell.styles";

interface TabellProps {
  children: ReactNode | ReactNode[];
  columns: number;
  header?: boolean;
  footer?: boolean;
}

const Tabell = ({ children, columns, header, footer }: TabellProps) => {
  return (
    <Container columns={columns} header={header} footer={footer}>
      {children}
    </Container>
  );
};

export default Tabell;
