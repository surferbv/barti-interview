import "./App.css";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "./Components/SearchBar";
import PatientDataGrid from "./Components/PatientDataGrid";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



function App() {
  return (
    <div className="App">
      <h1>Barti Patients App</h1>
      <Stack sx={{ align: "center" }}>
        <Item>
          <SearchBar/>
        </Item>

        <Item>
          <PatientDataGrid/>
        </Item>
      </Stack>
    </div>
  );
}

export default App;
