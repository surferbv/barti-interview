import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';

export default function SearchBar(props) {

  const options = props.options;

  const value = props.value;

  const setValue = props.setValue;
  
  const [inputValue, setInputValue] = React.useState('');

  const filterOptions = createFilterOptions({
    limit: 20
  });

  return (
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <Autocomplete
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

          disableClearable
          options={options}
          renderInput={(params) => ( 
            <TextField {...params} label="Search" InputProps={{...params.InputProps, type: 'search'}}/>
          )}
        />
      </div>
  );
}