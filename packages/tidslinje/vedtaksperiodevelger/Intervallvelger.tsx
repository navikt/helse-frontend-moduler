import React, { useContext } from 'react';
import { TidslinjeContext } from '../Tidslinje';
import { Select, IntervallvelgerContainer, SelectContainer } from './Intervallvelger.styles';

const Intervallvelger = () => {
    const { onSelect, aktivtIntervall, intervaller } = useContext(TidslinjeContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(intervaller.filter(periode => periode.fom === event.target.value).pop());
    };

    return (
        <IntervallvelgerContainer>
            <SelectContainer>
                <Select onChange={onChange} aria-label="Periode">
                    {intervaller.map((periode, index) => {
                        return (
                            <option
                                key={index}
                                value={periode.fom}
                                {...(periode.fom === aktivtIntervall?.fom && { selected: true })}
                            >
                                {periode.fom} - {periode.tom}
                            </option>
                        );
                    })}
                </Select>
            </SelectContainer>
        </IntervallvelgerContainer>
    );
};

export default Intervallvelger;
