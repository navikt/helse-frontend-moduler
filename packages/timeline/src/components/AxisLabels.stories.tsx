import React from 'react';
import styled from '@emotion/styled';

import { Period, PeriodProps } from './Period';
import { AxisLabels } from './AxisLabels';
import dayjs from 'dayjs';

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
                <AxisLabels start={dayjs('2018-01-01')} slutt={dayjs('2020-02-02')}></AxisLabels>
            </Container>
            <Container>
                <AxisLabels start={dayjs('2018-01-01')} slutt={dayjs('2020-02-02')} direction={'right'}></AxisLabels>
            </Container>
        </div>
    );
};
Basic.storyName = 'Axislabels';
