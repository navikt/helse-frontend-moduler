import React from 'react';

import { Row, RowProps } from './Row';
import { Period } from './Period';
import { getPositionedPeriods } from './calc';

export default {
    title: 'Timeline/Row',
    component: Row
};

export const Basic = (args: RowProps) => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2020, 0, 31);
    const periods = getPositionedPeriods(start, end, [
        { id: '123', start: new Date(2020, 0, 5), end: new Date(2020, 0, 15) },
        { id: '124', start: new Date(2020, 0, 16), end: new Date(2020, 0, 25) }
    ]);
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
