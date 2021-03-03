import { Pins } from './Pins';
import styled from '@emotion/styled';
import React from 'react';
import { AxisLabels } from './AxisLabels';
import { getPositionedPeriods } from './calc';
import { Row } from './Row';
import { Period } from './Period';

const StyledRow = styled(Row)`
    margin-bottom: 24px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 24px;
`;

export interface ExampleTimelineProps {
    start: Date;
    slutt: Date;
    direction: 'left' | 'right';
}

export const ExampleTimeline = ({ start, slutt, direction }: ExampleTimelineProps) => {
    const pins = [
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
        {
            date: new Date('2019-12-31'),
            render: 'Dette er der maksdato er på tidslinjen.',
        },
    ];

    const periods = getPositionedPeriods(
        start,
        slutt,
        [
            { id: '123', start: new Date(2020, 0, 1), end: new Date(2020, 0, 31) },
            { id: '1241', start: new Date(2020, 1, 1), end: new Date(2020, 1, 20) },
            { id: '124', start: new Date(2020, 1, 22), end: new Date(2020, 1, 28) },
            { id: '1223', start: new Date(2020, 5, 1), end: new Date(2020, 5, 31) },
            { id: '1226', start: new Date(2020, 7, 1), end: new Date(2020, 7, 31) },
        ],
        direction
    );

    return (
        <Container>
            <AxisLabels start={start} slutt={slutt} direction={direction} />
            <Pins start={start} slutt={slutt} direction={direction} pins={pins} />
            <StyledRow>
                {periods.map(({ id, style }) => (
                    <Period
                        key={id}
                        id={id}
                        style={style}
                        onClick={(id: string) => console.log('klikket på periode med id', id)}
                    />
                ))}
            </StyledRow>
            <StyledRow>
                {periods.map(({ id, style }) => (
                    <Period
                        key={id}
                        id={id}
                        style={style}
                        onClick={(id: string) => console.log('klikket på periode med id', id)}
                    />
                ))}
            </StyledRow>
        </Container>
    );
};

export default {
    title: 'Timeline/ExampleTimeline',
    component: ExampleTimeline,
    argTypes: {
        start: {
            defaultValue: new Date('2020-01-01'),
        },
        slutt: {
            defaultValue: new Date('2020-06-29'),
        },
        direction: {
            defaultValue: 'left',
        },
    },
};

ExampleTimeline.storyName = 'Example Timeline';
