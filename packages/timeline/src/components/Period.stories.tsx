import React from 'react';
import styled from '@emotion/styled';

import { Period, PeriodProps } from './Period';

export default {
    title: 'Timeline/Period',
    component: Period,
    argTypes: {
        style: {
            defaultValue: { width: '100%' },
        },
    },
};

const Container = styled.div`
    position: relative;
    width: 200px;
    height: max-content;
`;

export const Basic = (args: PeriodProps) => {
    return (
        <Container>
            <Period {...args} />
        </Container>
    );
};
Basic.storyName = 'A period';
