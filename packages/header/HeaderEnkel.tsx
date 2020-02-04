import React from 'react';
import { Avdeler, Rad, HeaderBar, TekstLiten, TekstNormal, Tittel } from './Header.styles';
import { Brukerinfo, HeaderProps } from './Header';

const Bruker = ({ navn, ident }: Brukerinfo) => (
    <Rad gap>
        <Avdeler />
        <TekstNormal>{navn}</TekstNormal>
        <TekstLiten>{ident}</TekstLiten>
    </Rad>
);

const HeaderEnkel = ({ tittel, children, brukerinfo }: HeaderProps) => {
    return (
        <HeaderBar>
            <Rad>
                <Tittel>{tittel}</Tittel>
                <Avdeler />
                {children}
            </Rad>
            <Bruker {...brukerinfo} />
        </HeaderBar>
    );
};

export default HeaderEnkel;
