import React, { useRef, useState, useEffect } from 'react';
import styles from './Saksmeny.less';

export enum Behandlingstype {
    Førstegangsbehandling = 'Førstegangsbehandling',
    FørstegangBeslutter = 'Førstegang - beslutter',
    Revurdering = 'Revudering'
}

const Dropdown = () => {
    const [aktivBehandlingstype, setAktivBehandlingstype] = useState<Behandlingstype>(
        Behandlingstype.Førstegangsbehandling
    );
    const [show, setShow] = useState(false);

    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleMousedown = () => {
            console.log('clicked');
        };
        window.addEventListener('mousedown', handleMousedown);
        return () => window.removeEventListener('mousedown', handleMousedown);
    }, []);

    return (
        <>
            <button
                className={show ? styles.lukknapp : styles.åpneknapp}
                onClick={() => setShow(!show)}
            >
                {aktivBehandlingstype}
            </button>
            {show && (
                <ul ref={ref}>
                    <li>Førstegangsbehandling</li>
                    <li>Beslutter</li>
                    <li>Revurdering</li>
                </ul>
            )}
        </>
    );
};

const Saksmeny = () => (
    <div className={styles.saksmeny}>
        <Dropdown />
    </div>
);

export default Saksmeny;
