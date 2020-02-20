import React, { useContext } from 'react';
import { ettårsskala, halvtårsskala, isoDato, kalkulerPosisjonOgBredde, treårsskala } from '../calc';
import { Skalapunkt, Skalastørrelse } from '../types';
import { TidslinjeContext } from './Tidslinje';
import { Dayjs } from 'dayjs';
import styles from './Tidsskala.less';

interface TidsskalaProps {
    sisteDag: Dayjs;
}

interface MånedsskalaProps {
    sisteDag: Dayjs;
    utsnitt: Skalastørrelse;
}

const År = ({ sisteDag }: TidsskalaProps) => (
    <>
        {treårsskala(sisteDag).map((år, i) => {
            const { left } = kalkulerPosisjonOgBredde(
                isoDato(år.dato),
                isoDato(år.dato),
                Skalastørrelse.TreÅr,
                sisteDag
            );
            return (
                <div className={styles.markering} key={i} style={{ left: `${left}%` }}>
                    {år.navn}
                </div>
            );
        })}
    </>
);

const Måneder = ({ utsnitt, sisteDag }: MånedsskalaProps) => {
    const skala = utsnitt === Skalastørrelse.HalvtÅr ? halvtårsskala(sisteDag) : ettårsskala(sisteDag);
    return (
        <>
            {skala.map((måned: Skalapunkt, i: number) => {
                const { left } = kalkulerPosisjonOgBredde(isoDato(måned.dato), isoDato(måned.dato), utsnitt, sisteDag);
                return (
                    <div className={styles.markering} key={i} style={{ left: `${left}%` }}>
                        {måned.navn}
                    </div>
                );
            })}
        </>
    );
};

const Tidsskala = () => {
    const { skalastørrelse, sisteDag } = useContext(TidslinjeContext);

    return (
        <div className={styles.container}>
            {skalastørrelse === Skalastørrelse.TreÅr ? (
                <År sisteDag={sisteDag} />
            ) : (
                <Måneder utsnitt={skalastørrelse} sisteDag={sisteDag} />
            )}
        </div>
    );
};

export default Tidsskala;
