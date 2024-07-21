import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosHttp from '../../../AxiosInstance';

const VerticalReview = () => {
  const [sitenames, setSitenames] = useState([]);

  useEffect(() => {
    axiosHttp.get("/GetProj_Site").then((res) => {
      if (res.data.msg === "Sites List") {
        setSitenames(res.data.data); // Set array of site names
      }
    });
  }, []);

  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  // Get selected sites from sessionStorage
  const selectedSites = sessionStorage?.getItem('site.Id')?.split(',') || [];
  const selectedSiteIds = selectedSites.map(number => parseInt(number));
  const empLength = (sessionStorage.getItem('selectedemp').trim()).split(',');
  // Prepare the payload object
  const payload = {
    id: generateId(),
    sites: selectedSiteIds.length,
    totalEmps: sessionStorage.getItem('selectedemp') ? empLength.length : 0,
    billStartDate: sessionStorage.getItem('billStartDate'),
    billEndDate: sessionStorage.getItem('billEndDate'),
  };

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
