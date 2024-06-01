import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const ModalDropdown = ( {value, setValue} ) => {
    const [isFocus, setIsFocus] = useState(false);
    const data =[
        {label: "Expense", value: "expense"},
        {label: "Income", value: "income"}
    ]

    return (
        <Dropdown
            selectedTextStyle={{paddingLeft: 10}}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            activeColor='#EEEEEE'
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
        />
    )
}

export default ModalDropdown;