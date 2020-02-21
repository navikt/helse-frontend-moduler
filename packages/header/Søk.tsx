import React, { useState } from 'react';
import IkonSøk from './icons/IkonSøk';
import styles from './Søk.less';

export interface SøkProps {
    onSøk: (value: string) => void;
}

const Søk = ({ onSøk }: SøkProps) => {
    const [value, setValue] = useState('');

    const søk = () => {
        if (value.length > 0) {
            onSøk(value);
        }
    };

    const onKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && value.length > 0) {
            søk();
        }
    };

    const onChange = (event: React.ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <div className={styles.container}>
            <input className={styles.søkefelt} onChange={onChange} onKeyPress={onKeyPress} value={value} />
            <button className={styles.søkeknapp} onClick={søk}>
                <IkonSøk />
            </button>
        </div>
    );
};

export default Søk;
