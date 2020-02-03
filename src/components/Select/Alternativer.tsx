import React from 'react';
import { Alternativ } from './Select';
import { Element, Container } from './Alternativer.styles';

interface AlternativerProps {
    alternativer: Alternativ[];
    isVisible: boolean;
    onClick(alternativ: Alternativ): void;
    onKeyPress(event: React.KeyboardEvent<HTMLLIElement>, alternativ: Alternativ): void;
}

export const Alternativer = ({ alternativer, isVisible, onClick, onKeyPress }: AlternativerProps) => {
    return (
        <Container hidden={!isVisible} tabIndex={-1}>
            {alternativer.map((item: Alternativ) => (
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
