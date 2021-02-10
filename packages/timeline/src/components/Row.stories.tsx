import React from 'react';

import { Row, RowProps } from './Row';
import { Period } from './Period';
import { getPositionedPeriods } from './calc';

export default {
    title: 'Timeline/Row',
    component: Row,
};

export const Basic = (args: RowProps) => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2020, 1, 28);
    const periods = getPositionedPeriods(
        start,
        end,
        [
            { id: '1241', start: new Date(2020, 1, 1), end: new Date(2020, 1, 20) },
            { id: '124', start: new Date(2020, 1, 22), end: new Date(2020, 1, 28) },
            { id: '123', start: new Date(2020, 0, 1), end: new Date(2020, 0, 31) },
        ],
        'right'
    );
    return (
        <Row {...args}>
            {periods.map(({ id, style }) => (
                <Period
                    key={id}
                    id={id}
                    style={style}
                    onClick={(id: string) => console.log('klikket på periode med id', id)}
                />
            ))}
        </Row>
    );
};
Basic.storyName = 'A row';
