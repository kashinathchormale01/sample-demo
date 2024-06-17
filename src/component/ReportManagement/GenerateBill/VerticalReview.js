import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosHttp from '../../../AxiosInstance';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerticalReview = () => {
  const [sitenames, setSitenames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosHttp.get("/GetProj_Site").then((res) => {
      if (res.data.msg === "Sites Dilo Bagh") {
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

  // Prepare the payload object
  const payload = {
    id: generateId(),
    sites: selectedSiteIds.length,
    totalEmps: sessionStorage.getItem('selectedEmployee') ? JSON.parse(sessionStorage.getItem('selectedEmployee')).length : 0,
    billStartDate: sessionStorage.getItem('billStartDate'),
    billEndDate: sessionStorage.getItem('billEndDate'),
  };

  // Convert payload object to an array of rows
  const rows = [payload];

  // Action buttons render function
  const renderActions = (params) => {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleWageSlip(params.row.id)}
          style={{ marginRight: 10 }}
        >
          Wage Slip
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleWageRegister(params.row.id)}
        >
          Wage Register
        </Button>
      </div>
    );
  };

  // Handle click actions
  const handleWageSlip = (id) => {
    // Implement your logic for Wage Slip
    console.log(`Wage Slip clicked for row with id ${id}`);
  };

  const handleWageRegister = (id) => {
    // Implement your logic for Wage Register
    console.log(`Wage Register clicked for row with id ${id}`);
  };

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
          {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: renderActions,
          },
        ]}
      />
    </div>
  );
};

export default VerticalReview;
