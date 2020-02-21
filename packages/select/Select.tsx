import React, { useRef, useState } from 'react';
import { Alternativer } from './Alternativer';
import classNames from 'classnames';
import styles from './Select.less';

export interface SelectProps {
    alternativer: Alternativ[];
    className?: string;
}

export interface Alternativ {
    value: string;
    id: number;
}

const Select = ({ alternativer, className }: SelectProps) => {
    let timeOutId = 0;

    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Alternativ>(alternativer && alternativer[0]);

    const containerRef = useRef<HTMLDivElement>(null);

    const updateSelectedItem = (alternativ: Alternativ) => {
        setDropdownVisible(false);
        setSelectedItem(alternativ);
    };

    const onKnappClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const onAlternativClick = (alternativ: Alternativ) => {
        updateSelectedItem(alternativ);
    };

    const onAlternativKeyPress = (event: React.KeyboardEvent<HTMLLIElement>, alternativ: Alternativ) => {
        if (event.key === 'Enter') {
            updateSelectedItem(alternativ);
        }
    };

    const onBlurHandler = () => {
        timeOutId = setTimeout(() => {
            setDropdownVisible(false);
        });
    };

    const onFocusHandler = () => {
        clearTimeout(timeOutId);
    };

    return (
        <div
            className={classNames('Select', className, styles.container)}
            ref={containerRef}
            tabIndex={-1}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
        >
            <button
                className={styles.knapp}
                aria-haspopup="listbox"
                aria-expanded={isDropdownVisible}
                onClick={onKnappClick}
            >
                {selectedItem.value}
            </button>
            <Alternativer
                alternativer={alternativer}
                isVisible={isDropdownVisible}
                onClick={onAlternativClick}
                onKeyPress={onAlternativKeyPress}
            />
        </div>
    );
};
export default Select;
