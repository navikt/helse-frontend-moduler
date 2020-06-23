import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Accordion.less';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

interface LabelProps {
    children: ReactNode;
    onClick: () => void;
    open: boolean;
    contentId: string;
    id: string;
}

const Label = ({ children, onClick, open, contentId, id }: LabelProps) => (
    <button
        onClick={onClick}
        className={classNames(styles.label, open && styles.openLabel)}
        aria-expanded={open}
        aria-controls={contentId}
        id={id}
    >
        {children}
    </button>
);

interface ContentProps {
    children: ReactNode;
    open: boolean;
    labelId: string;
    id: string;
}

const Content = ({ children, open, id, labelId }: ContentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [innerHeight, setInnerHeight] = useState<number | null>(null);

    useEffect(() => {
        if (ref.current) {
            setInnerHeight(ref.current.scrollHeight);
        }
    }, [ref.current]);

    return (
        <div
            className={classNames(styles.content, open && styles.openContent)}
            style={{ height: open ? `${innerHeight}px` : '0' }}
            role="region"
            id={id}
            aria-labelledby={labelId}
            ref={ref}
        >
            {children}
        </div>
    );
};

const groupAccordionItems = (ungrouped: ReactNode[]): [ReactNode, ReactNode][] => {
    const labels: ReactNode[] = [];
    const contents: ReactNode[] = [];

    ungrouped.forEach((element, index) => {
        if (index % 2 === 0) {
            labels.push(element);
        } else {
            contents.push(element);
        }
    });

    return labels.map((label, index) => [label, contents[index]]);
};

interface AccordionItemType {
    label: ReactNode;
    content: ReactNode;
    open: boolean;
    labelId: string;
    contentId: string;
}

interface AccordionItemProps extends AccordionItemType {
    toggleOpen: () => void;
}

const AccordionItem = React.memo(({ label, content, open, toggleOpen, labelId, contentId }: AccordionItemProps) => (
    <div className={styles.accordionItem}>
        <Label open={open} onClick={toggleOpen} id={labelId} contentId={contentId}>
            {label}
        </Label>
        <Content open={open} id={contentId} labelId={labelId}>
            {content}
        </Content>
    </div>
));

export interface AccordionProps {
    children: ReactNode[];
    className?: string;
    exclusiveOpen?: boolean;
}

export const Accordion = ({ children, className, exclusiveOpen = false }: AccordionProps) => {
    const groupedChildren: AccordionItemType[] = useMemo(
        () =>
            groupAccordionItems(children).map(([label, content]) => ({
                label,
                content,
                open: false,
                labelId: nanoid(),
                contentId: nanoid()
            })),
        [children]
    );

    const [items, setItems] = useState(groupedChildren);

    const toggleOpen = (index: number) => {
        setItems(items =>
            items.map((item, i) =>
                i === index ? { ...item, open: !item.open } : { ...item, open: exclusiveOpen ? false : item.open }
            )
        );
    };

    return (
        <div className={classNames('Accordion', className)}>
            {items.map(({ label, content, open, labelId, contentId }: AccordionItemType, index: number) => (
                <AccordionItem
                    key={index}
                    label={label}
                    content={content}
                    open={open}
                    toggleOpen={() => toggleOpen(index)}
                    labelId={labelId}
                    contentId={contentId}
                />
            ))}
        </div>
    );
};
