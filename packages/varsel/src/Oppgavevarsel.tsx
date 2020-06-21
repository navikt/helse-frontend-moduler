import React, { ReactNode } from 'react';
import Varsel, { Varseltype } from './Varsel';
import styles from './Oppgavevarsel.less';

interface OppgavevarselProps {
    oppgavelenke?: string;
    children?: ReactNode | ReactNode[];
}

const Oppgavevarsel = ({ children, oppgavelenke }: OppgavevarselProps) => (
    <Varsel type={Varseltype.Advarsel}>
        <p className={styles.oppgave}>Oppgave</p>
        {children}
        {oppgavelenke && (
            <a className={styles.oppgavelenke} href={oppgavelenke}>
                Gå til oppgave
            </a>
        )}
    </Varsel>
);

export default Oppgavevarsel;
