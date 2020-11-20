import React, { useLayoutEffect, useRef, useState } from 'react';
import { Toggleknapp, ToggleknappProps } from './src/Toggleknapp';
import { Togglegruppe } from './src';
import styled from '@emotion/styled';

export default {
    title: 'Toggleknapp',
    component: Toggleknapp,
    subcomponents: { Togglegruppe },
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

const Flex = styled.div`
    display: flex;
    width: max-content;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const Separator = styled.hr<{ active?: boolean }>`
    position: relative;
    border: none;
    height: 1px;
    background: #c6c2bf;

    ${({ active }) =>
        active &&
        `
        &:before {
            position: absolute;
            content: '';
            width: 10px;
            height: 10px;
            border-left: 1px solid #c6c2bf;
            border-top: 1px solid #c6c2bf;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            background: #fff;
        }
    `}
`;

const useButtonWidth = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonWidth, setButtonWidth] = useState(0);

    useLayoutEffect(() => {
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, [buttonRef.current]);

    return { width: buttonWidth, ref: buttonRef };
};

export const MedRefs = () => {
    const { ref: buttonRef1, width: width1 } = useButtonWidth();
    const { ref: buttonRef2, width: width2 } = useButtonWidth();
    const { ref: buttonRef3, width: width3 } = useButtonWidth();

    const [activeButton, setActiveButton] = useState<number | undefined>();

    return (
        <FlexColumn>
            <Togglegruppe
                toggles={[
                    {
                        render: '🔥🔥🔥🔥🔥',
                        buttonRef: buttonRef1,
                        onToggle: () => setActiveButton(activeButton === 0 ? undefined : 0),
                    },
                    {
                        render: '🍔🍔🍔',
                        buttonRef: buttonRef2,
                        onToggle: () => setActiveButton(activeButton === 1 ? undefined : 1),
                    },
                    {
                        render: '🌈',
                        buttonRef: buttonRef3,
                        onToggle: () => setActiveButton(activeButton === 2 ? undefined : 2),
                    },
                ]}
            />
            <Flex style={{ transform: 'translateX(1px)' }}>
                <Separator active={activeButton === 0} style={{ width: `${width1 + 1}px` }} />
                <Separator active={activeButton === 1} style={{ width: `${width2 + 1}px` }} />
                <Separator active={activeButton === 2} style={{ width: `${width3 + 1}px` }} />
            </Flex>
        </FlexColumn>
    );
};
MedRefs.storyName = 'Togglegruppe med button-refs';
