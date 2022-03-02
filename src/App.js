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
  const storedValue = JSON.parse( localStorage.getItem( 'value' ) );

  // If searhHistory local storage exists set it searchHistory else set it to a new object {}
  const searchHistory = localStorage.getItem( 'searchHistory' ) ? JSON.parse( localStorage.getItem( 'searchHistory' ) ) : { history:[] }; 

  const [patients, setPatients] = useState([]);
  
  const [options, setOptions] = useState([]);

  const [inputValue, setInputValue] = useState('');

  // sets the value if it is null returns empty string
  const [value, setValue] = useState( 
    
    storedValue === 'null' ? '' : storedValue 

  );

  // save value to local storage
  useEffect( () => {
    
    localStorage.setItem('value', JSON.stringify( value ));

    // Guard against null values     
    if(value && value !== " "){
      // When value changes we push it as a new key value pair into searchHistory
      console.log("Value:", value)
      console.log("SearchHistory: ", searchHistory.history );
      if( searchHistory.history.length < 10){
        if (searchHistory.history.indexOf( value )){
          searchHistory.history.push(  value  );
        }
      }else{
        if (searchHistory.history.indexOf( value )){
          searchHistory.history.shift(); // remove the last item entered 
          searchHistory.history.push(  value  ); // add new item
        }
      }
      // Then we stringify the searchHistory object and set it to the searchHistory localstorage
      localStorage.setItem('searchHistory', JSON.stringify( searchHistory ));
    }
  
  }, [value]);

  // setPatients to update data grid depends on value change
  useEffect( () => {

    getPatients(value)
      .then( patientsData => {
        
        setPatients( patientsData );
        
      })
    },[value])

  // setOptions
  useEffect( () => {

    getPatients()
      .then( patientsData => { 
      
      const searchHistoryList = searchHistory.history
      const fullNameOptions = []
        
      patientsData.forEach( (patient) => { 
        fullNameOptions.push(patient.fullName);
      })


      // console.log("Search History: ", searchHistoryList);
      // console.log("Full Name Options: ", fullNameOptions);

      setOptions( searchHistoryList.concat(fullNameOptions) );
      // setOptions( patientsData );
      // setOptions( fullNameOptions );

    })
  },[value])

  return (
    <div className="App">
      <h1 className="center-align-inside" >Barti Patient App</h1>
      <Stack >
        <Item >
          <SearchBar 
          
          options={ options } 

          value={ value } 
          setValue={ setValue } 
          
          inputValue={ inputValue } 
          setInputValue={ setInputValue }
          />
        </Item>

        <Item>
          <PatientDataGrid getPatients={ patients } />
        </Item>
      </Stack>
    </div>
  );
}

export default App;
