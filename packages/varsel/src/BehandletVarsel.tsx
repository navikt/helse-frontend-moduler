import React, { ReactNode } from 'react';
import styles from './BehandletVarsel.less';
import classNames from 'classnames';

export interface BehandletInnholdProps {
    tittel: string;
    saksbehandler?: string;
    children?: ReactNode | ReactNode[];
    className?: string;
    vurderingsdato?: string;
    automatiskBehandlet: boolean;
}

export const BehandletVarsel = ({
    tittel,
    saksbehandler,
    vurderingsdato,
    children,
    className,
    automatiskBehandlet
}: BehandletInnholdProps) => (
    <div
        className={classNames(
            'BehandletVarsel',
            styles.behandletVarsel,
            !children && styles.noChildren,
            automatiskBehandlet && styles.automatisk,
            className
        )}
    >
        <p className={styles.tittel}>{tittel}</p>
        <p className={styles.undertekst}>
            {automatiskBehandlet ? 'Automatisk godkjent' : `Behandlet av ${saksbehandler}`}
            {vurderingsdato && ` - ${vurderingsdato}`}
        </p>
        {children}
    </div>
);
