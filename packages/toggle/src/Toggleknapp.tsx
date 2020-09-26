import React, { ReactNode, useState } from 'react';
import styles from './Toggleknapp.less';
import classNames from 'classnames';

export interface ToggleknappProps {
    children: ReactNode | ReactNode[];
    toggled?: boolean;
    onToggle?: () => void;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const Toggleknapp = ({ children, toggled, onToggle, buttonRef }: ToggleknappProps) => {
    const [isToggled, setIsToggled] = useState(toggled);

    const toggle = () => {
        setIsToggled(!isToggled);
        onToggle?.();
    };

    return (
        <button
            className={classNames(
                styles.toggle,
                toggled !== undefined ? toggled && styles.toggled : isToggled && styles.toggled
            )}
            onClick={toggle}
            ref={buttonRef}
        >
            {children}
        </button>
    );
};
