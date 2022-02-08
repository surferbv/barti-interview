import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import getAllPatients from "../Services/PatientApi";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("John", "Smith", 6.0, 24, 4.0)];

function SearchResultsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAllPatients().then((results) => {
      if (mounted) {
        setPatients(results);
      }
    });
    return () => mounted = false;
  }, []);

//   console.log(patients);


  return (
    <TableContainer component={Paper} align="center" max-width="400">
      <Table stickyHeader sx={{ maxWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row) => (
            <TableRow
              key={row.firstName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SearchResultsList;
