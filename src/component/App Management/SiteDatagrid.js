import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Datagridaction from './Datagridaction';

const columns = [
    { field: "Id", headerName: "Site Id", flex: 1 },
    { field: "siteName", headerName: "Site Name", flex: 1 },
    { field: "siteArea", headerName: "Area Name", flex: 1 },
    { field: "creationDate", headerName: "Creation Date", flex: 1 },
    { field: "Action", headerName: "Action", flex: 1, renderCell:(params)=>{<Datagridaction {...{params}} />} },
  ];

const SiteDatagrid = () => {
    const [tableData, setTableData] = useState([]);
console.log(tableData);

    useEffect(() => {
        fetch("http://192.168.1.121:8089/api/GetProj_Site")
          .then((data) => data.json())
          .then((data) => setTableData(data.data))
    
      }, []);
      console.log(tableData);
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        getRowId={(row) =>  row.Id + row.siteName}
      />
    </div>
  )
}

export default SiteDatagrid