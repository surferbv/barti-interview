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
  
  const [patients, setPatients] = useState([]);
  
  const [value, setValue] = useState('');

  const [options, setOptions] = useState([]);


  useEffect(()=>{

    getPatients(value)
      .then( patientsData => {
        
        const tempOptions = []

        setPatients( patientsData );
        
        patientsData.forEach( (patient) => { 

          tempOptions.push(patient.fullName);

          setOptions(tempOptions);

        })
      })
    },[ value ])

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
