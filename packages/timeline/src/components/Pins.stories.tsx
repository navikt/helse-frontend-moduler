import { Pins, PinsProps } from './Pins';
import styled from '@emotion/styled';
import React from 'react';

export default {
    title: 'Timeline/Pins',
    component: Pins,
    argTypes: {
        start: {
            defaultValue: new Date('2020-01-01'),
        },
        slutt: {
            defaultValue: new Date('2020-06-30'),
        },
        direction: {
            defaultValue: 'left',
        },
        pins: {
            defaultValue: [
                {
                    date: new Date('2020-01-01'),
                    render: 'Dette er der maksdato er på tidslinjen.',
                    style: {
                        color: 'red',
                        backgroundColor: 'red',
                    },
                },
                {
                    date: new Date('2020-01-20'),
                    render: 'Dette er der maksdato er på tidslinjen.',
                },
            ],
        },
    },
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
`;

export const Basic = (args: PinsProps) => {
    return (
        <Container>
            <Pins {...args} />
        </Container>
    );
};
Basic.storyName = 'Pins';
