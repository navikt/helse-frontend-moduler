/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import { SelectContainer, Knapp } from './Select.styles';
import { Alternativer } from './Alternativer';

export interface SelectProps {
    alternativer: AlternativData[];
}

export interface AlternativData {
    value: string;
    id: number;
}

const Select = ({ alternativer }: SelectProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<AlternativData>(alternativer && alternativer[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateSelectedItem = (alternativ: AlternativData) => {
        setSelectedItem(alternativ);
        setVisible(!visible);
    };

    const onAlternativClick = (alternativ: AlternativData) => {
        updateSelectedItem(alternativ);
    };

    const onAlternativKeyPress = (event: React.KeyboardEvent<HTMLLIElement>, alternativ: AlternativData) => {
        if (event.key === 'Enter') updateSelectedItem(alternativ);
    };

    const handleClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
    });

    return (
        <SelectContainer ref={containerRef} tabIndex={-1}>
            <Knapp
                onClick={() => setVisible(!visible)}
                onKeyPress={e => (e.key === 'Enter' ? setVisible(!visible) : '')}
            >
                {selectedItem.value}
            </Knapp>
            <Alternativer
                alternativer={alternativer}
                isVisible={visible}
                onClick={onAlternativClick}
                onKeyPress={onAlternativKeyPress}
            />
        </SelectContainer>
    );
};
export default Select;
