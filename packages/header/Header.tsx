import React, { ReactNode, useState } from 'react';
import {
    Avdeler,
    Brukerknapp,
    Rad,
    Kolonne,
    HeaderBar,
    Systemknapp,
    TekstLiten,
    TekstNormal,
    Tittel
} from './Header.styles';
import IkonSystem from './icons/IkonSystem';

export type Brukerinfo = {
    navn: string;
    ident: string;
    enhet?: string;
    rolle?: string;
};

export interface HeaderProps {
    tittel: string;
    brukerinfo: Brukerinfo;
    children?: ReactNode | ReactNode[];
}

export const Bruker = ({ navn, ident, enhet, rolle }: Brukerinfo) => {
    const [åpen, setÅpen] = useState(false);

    return (
        <Brukerknapp åpen={åpen} onClick={() => setÅpen(å => !å)}>
            <Rad gap>
                <TekstNormal>{navn}</TekstNormal>
                <TekstLiten>{ident}</TekstLiten>
            </Rad>
            <TekstLiten>
                {enhet}
                {rolle ? `, ${rolle}` : ''}
            </TekstLiten>
        </Brukerknapp>
    );
};

const Header = ({ tittel, children, brukerinfo }: HeaderProps) => {
    return (
        <HeaderBar>
            <Rad>
                <Tittel>{tittel}</Tittel>
                <Avdeler />
                {children}
            </Rad>
            <Rad>
                <Systemknapp>
                    <IkonSystem />
                </Systemknapp>
                <Avdeler />
                <Bruker {...brukerinfo} />
            </Rad>
        </HeaderBar>
    );
};

export default Header;
