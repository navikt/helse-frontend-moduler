import React, { ReactNode } from 'react';
import styles from './BehandletInnhold.less';

export interface BehandletInnholdProps {
    tittel: string;
    saksbehandler: string;
    vurderingsdato?: string;
    children: ReactNode | ReactNode[];
}

const BehandletInnhold = ({
    tittel,
    saksbehandler,
    vurderingsdato,
    children
}: BehandletInnholdProps) => {
    return (
        <div className={styles.behandletInnhold}>
            <p className={styles.tittel}>{tittel}</p>
            <p className={styles.undertekst}>
                Behandlet av {saksbehandler}
                {vurderingsdato && ` - ${vurderingsdato}`}
            </p>
            {children}
        </div>
    );
};

export default BehandletInnhold;
