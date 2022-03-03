import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';


export default function PatientDataGrid(props) {
  
  const titleColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    }
  ];
  
  const patients = props.getPatients;
  
  const rows = patients;

  const [rowState, setRowState] = useState({
    page: 0,
    pageSize: 5,
    row:[],
    loading: false
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        paginationMode='server'
        rowCount={5} 
        className="center-block"
        rows={rows}
        columns={titleColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}

        onPageChange={ ( page )=>(
          console.log("Page:", page)
        )}

        disableSelectionOnClick
        sx={{ width:500 }}
      />
    </div>
  );
}
