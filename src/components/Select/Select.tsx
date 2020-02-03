/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Knapp } from './Select.styles';
import { Alternativer } from './Alternativer';

export interface SelectProps {
    alternativer: Alternativ[];
}

export interface Alternativ {
    value: string;
    id: number;
}

const Select = ({ alternativer }: SelectProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Alternativ>(alternativer && alternativer[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateSelectedItem = (alternativ: Alternativ) => {
        setSelectedItem(alternativ);
        setVisible(!visible);
    };

    const onAlternativClick = (alternativ: Alternativ) => {
        updateSelectedItem(alternativ);
    };

    const onAlternativKeyPress = (event: React.KeyboardEvent<HTMLLIElement>, alternativ: Alternativ) => {
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
        <Container ref={containerRef} tabIndex={-1}>
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
        </Container>
    );
};
export default Select;
