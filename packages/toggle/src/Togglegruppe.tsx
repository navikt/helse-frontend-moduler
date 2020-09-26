import React, { ReactNode, useState } from 'react';
import { togglegruppe } from './Togglegruppe.less';
import { Toggleknapp } from './Toggleknapp';

export type Toggle = {
    render: ReactNode;
    toggled?: boolean;
    onToggle?: () => void;
    buttonRef?: React.RefObject<HTMLButtonElement>;
};

export interface TogglegruppeProps {
    toggles: Toggle[];
    multi?: boolean;
}

export const Togglegruppe = ({ toggles, multi = false }: TogglegruppeProps) => {
    const [toggled, setToggled] = useState<number>();
    return (
        <span className={togglegruppe}>
            {toggles.map(({ render, ...rest }, i) => (
                <Toggleknapp
                    key={i}
                    toggled={multi ? undefined : toggled === i}
                    {...rest}
                    onToggle={() => {
                        setToggled(t => (t === i ? undefined : i));
                        rest.onToggle?.();
                    }}
                >
                    {render}
                </Toggleknapp>
            ))}
        </span>
    );
};
