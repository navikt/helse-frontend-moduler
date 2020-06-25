import React, { ReactNode } from 'react';
import { Varsel, Varseltype } from './Varsel';
import styles from './Oppgavevarsel.less';

interface OppgavevarselProps {
    oppgavelenke?: string;
    children?: ReactNode | ReactNode[];
    className?: string;
}

export const Oppgavevarsel = ({ children, oppgavelenke, className }: OppgavevarselProps) => (
    <Varsel type={Varseltype.Advarsel} className={className}>
        <p className={styles.oppgave}>Oppgave</p>
        {children}
        {oppgavelenke && (
            <a className={styles.oppgavelenke} href={oppgavelenke}>
                Gå til oppgave
            </a>
        )}
    </Varsel>
);
