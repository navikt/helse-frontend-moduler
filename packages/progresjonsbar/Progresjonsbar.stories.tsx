import React from 'react';
import { Progresjonsbar, ProgresjonsbarProps } from './src/Progresjonsbar';
import styled from '@emotion/styled';

export default {
    title: 'Progresjonsbar',
    component: Progresjonsbar,
    argTypes: {
        upperBound: {
            defaultValue: 100,
        },
        currentValue: {
            defaultValue: 50,
        },
    },
};

const Container = styled.div`
    width: 200px;
    height: 50px;
`;

export const Basic = (args: ProgresjonsbarProps) => (
    <Container>
        <Progresjonsbar {...args} />
    </Container>
);

Basic.storyName = 'Progresjonsbar';
