import React from 'react';
import { AlternativData } from './Select';
import { Element, Container } from './Alternativer.styles';

interface AlternativerProps {
    alternativer: AlternativData[];
    isVisible: boolean;
    onClick(alternativ: AlternativData): void;
    onKeyPress(event: React.KeyboardEvent<HTMLLIElement>, alternativ: AlternativData): void;
}

export const Alternativer = ({ alternativer, isVisible, onClick, onKeyPress }: AlternativerProps) => {
    return (
        <Container hidden={!isVisible} tabIndex={-1}>
            {alternativer.map((item: AlternativData) => (
                <Element
                    key={item.id}
                    onClick={() => onClick(item)}
                    onKeyPress={(event: React.KeyboardEvent<HTMLLIElement>) => onKeyPress(event, item)}
                    tabIndex={0}
                >
                    {item.value}
                </Element>
            ))}
        </Container>
    );
};
