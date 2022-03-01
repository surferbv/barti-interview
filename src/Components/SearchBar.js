import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';

export default function SearchBar(props) {

  const patientList = props.options; // array of options to select for autocomplete dropdown

  const inputValue = props.inputValue; // state enterd into the input value

  const setInputValue = props.setInputValue; // set state of the input value

  const value = props.value; // state of the value

  const setValue = props.setValue; // set state value
  
  const filterOptions = createFilterOptions({
    limit: 20
  });

  return (
      <div>
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div> */}
        <Autocomplete
          loading
          freeSolo
          filterOptions={filterOptions}
          id="search-bar"

          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {  
            setInputValue(newInputValue);
          }}

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}

          options={patientList}
          renderInput={ (params)=> <TextField {...params} label="PatientName" /> }

          sx={{ width: 400 }}
        />
     
      </div>
  );
}