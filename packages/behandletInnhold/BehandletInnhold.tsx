import React, { ReactNode } from 'react';
import styles from './BehandletInnhold.less';
import classNames from 'classnames';

export interface BehandletInnholdProps {
    tittel: string;
    saksbehandler: string;
    children?: ReactNode | ReactNode[];
    className?: string;
    vurderingsdato?: string;
}

const BehandletInnhold = ({ tittel, saksbehandler, vurderingsdato, children, className }: BehandletInnholdProps) => {
    return (
        <div className={classNames(styles.behandletInnhold, !children && styles.noChildren, className)}>
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
