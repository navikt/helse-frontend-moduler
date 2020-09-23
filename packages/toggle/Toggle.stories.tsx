import React from 'react';
import { Toggleknapp, ToggleknappProps } from './src/Toggleknapp';
import { Togglegruppe } from './src';

export default {
    title: 'Toggleknapp',
    component: Toggleknapp,
    subcomponents: { Togglegruppe }
};

export const Basic = (args: React.PropsWithChildren<ToggleknappProps>) => (
    <Toggleknapp {...args}>Toggle me!</Toggleknapp>
);
Basic.storyName = 'Toggleknapp';

export const Gruppe = () => <Togglegruppe toggles={[{ render: 1 }, { render: 2 }, { render: 3 }]} />;
Gruppe.storyName = 'Togglegruppe';
Gruppe.showCode = true;

export const Multigruppe = () => <Togglegruppe multi toggles={[{ render: 1 }, { render: 2 }, { render: 3 }]} />;
Multigruppe.storyName = 'Togglegruppe med multiselect';
