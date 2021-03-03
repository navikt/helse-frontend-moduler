import React from 'react';
import styled from '@emotion/styled';
import { AxisLabels } from './AxisLabels';

export default {
    title: 'Timeline/AxisLabels',
    component: AxisLabels,
};

const Container = styled.div`
    position: relative;
    width: 200px;
    height: max-content;
`;

export const Basic = () => {
    return (
        <div>
            <Container>
                <AxisLabels start={new Date('2018-01-01')} slutt={new Date('2020-02-02')} />
            </Container>
            <Container>
                <AxisLabels start={new Date('2018-01-01')} slutt={new Date('2020-02-02')} direction={'right'} />
            </Container>
        </div>
    );
};
Basic.storyName = 'Axislabels';
