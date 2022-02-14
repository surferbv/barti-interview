import "./App.css";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "./Components/SearchBar";
import PatientDataGrid from "./Components/PatientDataGrid";
import { useEffect, useState } from "react";
import getPatients from "./Services/PatientApi";


const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



function App() {

  // gets the value from local storage
  const storedValue = localStorage.getItem( "value" );
  
  const [patients, setPatients] = useState([]);
  
  const [value, setValue] = useState('');

  const [options, setOptions] = useState([]);

  // sets the value if it is null returns empty string
  const [value, setValue] = useState( 
    
    storedValue == 'null' ? '' : storedValue 

  );

  useEffect( () => {
    
    setValue(window.localStorage.getItem('value'));
  
  }, []);

  // setPatients
  useEffect( () => {

    getPatients(value)
      .then( patientsData => {
        
        setPatients( patientsData );
        window.localStorage.setItem('value', value);
        
      })
    },[ value ])

  // setOptions
  useEffect( () => {

    getPatients()
      .then( patientsData => { 
      
      const fullNameOptions = []
        
      patientsData.forEach( (patient) => { 

        fullNameOptions.push(patient.fullName);

        setOptions(fullNameOptions);

      })
    })
  },[])

  return (
    <div className="App">
      <h1>Barti Patients App</h1>
      <Stack sx={{ align: "center" }}>
        <Item>
          <SearchBar options={ options } value={ value } setValue={ setValue } />
        </Item>

        <Item>
          <PatientDataGrid getPatients={ patients } />
        </Item>
      </Stack>
    </div>
  );
}

export default App;
