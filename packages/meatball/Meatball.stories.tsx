import React from 'react';
import { Meatball, MeatballProps } from './src/Meatball';

export default {
    title: 'Meatball',
    component: Meatball,
    argTypes: {
        size: {
            defaultValue: 'l',
        },
        borderColor: {
            defaultValue: '#0067C5',
        },
        dotColor: {
            defaultValue: '#0067C5',
        },
    },
};

export const Basic = (args: MeatballProps) => <Meatball {...args} data-tip={'Hello world'} />;

Basic.storyName = 'Meatball';
