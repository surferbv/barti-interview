import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';


export default function PatientDataGrid(props) {
  
  const dataGridColumnsTitle = [
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

  const patientRowsData = props.getPatientsData;

  // // TODO: rowState?
  const [rowState, setRowState] = useState({
    page: 0,      // ?page=10
    pageSize: 5,  // ?limit=3
    rows:[],      // Holds our 
    loading: false
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className="center-block"
        
        columns={dataGridColumnsTitle}
        
        // rowState
        // page                    // Zero based index of the current page
        // pageSize={5}            // Set the number of rows in one page. If so of the rows have children for instance in the tree data this number represents the amount of the top level rows wanted on each page. 
        // rows={patientRowsData}  // Set of rows of type GridRowsProp
        // loading
        {...rowState}

        paginationMode='server'
        rowCount={5} 
        rowsPerPageOptions={[5]}

        // onPageChange={ (page)=> setRowState( (prev)=>({...prev, page}) ) }
        // onPageSizeChange={ (pageSize)=> setRowState( (prev)=>({...prev, pageSize}) ) }


        disableSelectionOnClick
        sx={{ width:500 }}
      />
    </div>
  );
}
