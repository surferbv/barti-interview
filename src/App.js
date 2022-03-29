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
  // If searhHistory local storage exists set it searchHistory else set it to a new object {}
  const searchHistory = localStorage.getItem( 'searchHistory' ) ? JSON.parse( localStorage.getItem( 'searchHistory' ) ) : { history:[] }; 

  // gets the value from local storage
  const storedValue = JSON.parse( localStorage.getItem( 'value' ) );

  // Patient records array and object
  const [patients, setPatients] = useState([]);
  
  // Patient full name array and string
  const [options, setOptions] = useState([]);

  // Input value from auto complete string
  const [inputValue, setInputValue] = useState('');

  // Value entered from the auto complete field string
  // sets the value if it is null returns empty string
  const [value, setValue] = useState( 
    storedValue === 'null' ? '' : storedValue 
  );

  // Pagination
  const [rowState, setRowState] = useState({
    page: 1,      // ?page=10
    pageSize: 5,  // ?limit=3
    rows:[],      // Holds oure user data
    loading: false 
  });

  // Local Storage
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

  // Data Grid
  // setPatients to update data grid depends on value change
  useEffect( () => {

    // String
    const queryParam = `?search=${value}&page=${rowState.page}&limit=${rowState.pageSize}`;

    console.log("Query String:", queryParam)

    getPatients(value)
      .then( patientsData => {
        setPatients( patientsData );
        // setRowState((prev)=>({...prev, loading: true}));
      })
    },[value])

  // Auto Complete
  // setOptions to update the drop down
  useEffect( () => {
    getPatients()
      .then( patientsData => { 
      
      const searchHistoryList = searchHistory.history
      const fullNameOptions = []
        
      patientsData.forEach( (patient) => { 
        fullNameOptions.push(patient.fullName);
      })

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
          <PatientDataGrid getPatientsData={ patients } />
        </Item>
      </Stack>
    </div>
  );
}

export default App;
