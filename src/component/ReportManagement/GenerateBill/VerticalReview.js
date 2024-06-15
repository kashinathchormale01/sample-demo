import React, { useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import axiosHttp from '../../../AxiosInstance';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerticalReview = () => {
const [sitenames, setSitenames] = useState();
const navigate = useNavigate();

  React.useEffect(() => {
    axiosHttp
      .get("/GetProj_Site")
      .then((res) => {
        //console.log(res);
        if (res.data.msg === "Sites Dilo Bagh") {
          // console.log("success",res.data.data);         
          // let allsites = []
          // allsites.push(res.data.data.map((site) => site.siteName));
           setSitenames(res.data.data.length);
        }
      }
    )},[])

  // Assuming TotalAmountempdata is defined somewhere

  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  // Creating payload object

  const sitelen=sessionStorage?.getItem('site.Id')?.split(',');
const sitelenresult=sitelen?.map(number=>parseInt(number));

console.log('sitelen',sitelenresult)
  const payload = {
    id: generateId(),
    sites: sitelenresult.length,
    totalEmps: sessionStorage.getItem('selectedEmployee') ? JSON.parse(sessionStorage.getItem('selectedEmployee')).length : 0,
    billStartDate: sessionStorage.getItem('billStartDate'),
    billEndDate: sessionStorage.getItem('billEndDate'),
  };

  

  console.log('sitenames',sitenames)

  // Convert payload object to an array of rows
  const rows = [payload];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'id', headerName: 'ID', width: 150 },
          { field: 'sites', headerName: 'Sites', width: 150 },
          { field: 'totalEmps', headerName: 'Total Employees', width: 200 },
          { field: 'billStartDate', headerName: 'Bill Start Date', width: 200 },
          { field: 'billEndDate', headerName: 'Bill End Date', width: 200 },
        ]}
      />
    </div>
  );
};

export default VerticalReview;
