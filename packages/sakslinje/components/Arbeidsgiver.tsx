import React from 'react';
import IkonArbeidsgiver from '../icons/IkonArbeidsgiver';
import styles from './Arbeidsgiver.less';

interface ArbeidsgiverProps {
    tekst: string | string[];
}

const Arbeidsgiver = ({ tekst }: ArbeidsgiverProps) => {
    const formatertTekst = Array.isArray(tekst)
        ? tekst.reduce(
              (acc: string[], cur: string, i) => (i !== tekst.length - 1 ? acc.concat([cur, '/']) : acc.concat([cur])),
              []
          )
        : [tekst];

    return (
        <div className={styles.arbeidsgiver}>
            <IkonArbeidsgiver />
            {formatertTekst.map((tekst, i) => (
                <span key={i}>{tekst}</span>
            ))}
        </div>
    );
};

export default Arbeidsgiver;
