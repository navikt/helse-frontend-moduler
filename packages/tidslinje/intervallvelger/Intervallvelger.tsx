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
                <Select onChange={onChange} aria-label="Periode" value={aktivtIntervall?.fom}>
                    {intervaller.map((intervall, index) => {
                        return (
                            <option key={index} value={intervall.fom}>
                                {intervall.fom} - {intervall.tom}
                            </option>
                        );
                    })}
                </Select>
            </SelectContainer>
        </IntervallvelgerContainer>
    );
};

export default Intervallvelger;
