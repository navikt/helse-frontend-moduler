import React from 'react';
import { AlternativData } from './Select';
import { Body } from './Alternativ.styles';

interface AlternativProps {
    alternativ: AlternativData;
    onClick(alternativ: AlternativData): void;
    onKeyPress(event: React.KeyboardEvent<HTMLDivElement>, alternativ: AlternativData): void;
}

export const Alternativ = ({ alternativ, onClick, onKeyPress }: AlternativProps) => {
    const { id, value } = alternativ;
    return (
        <Body
            key={id}
            onClick={() => onClick(alternativ)}
            onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => onKeyPress(event, alternativ)}
            tabIndex={0}
        >
            {value}
        </Body>
    );
};
