/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import { SelectContainer, Knapp, Alternativ as Alt, AlternativContainer } from './Select.styles';

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

    const handleClick = (e: any) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
    });

    return (
        <SelectContainer ref={containerRef}>
            <Knapp
                onClick={() => setVisible(!visible)}
                onKeyPress={e => (e.key === 'Enter' ? setVisible(!visible) : '')}
            >
                {selectedItem.value}
            </Knapp>
            <AlternativContainer hidden={!visible} tabIndex={-1}>
                {alternativer.map(alternativ => (
                    <Alt
                        key={alternativ.id}
                        onClick={() => {
                            setSelectedItem(alternativ);
                            setVisible(false);
                        }}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                setVisible(!visible);
                                setSelectedItem(alternativ);
                            }
                        }}
                        tabIndex={0}
                    >
                        {alternativ.value}
                    </Alt>
                ))}
            </AlternativContainer>
        </SelectContainer>
    );
};
export default Select;
