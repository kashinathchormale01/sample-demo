import React, { useState, useEffect } from "react";
import { Box, Button, TextField,Typography } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import axiosHttp from "../../../AxiosInstance";
import { toast } from "react-toastify";
import moment from "moment";

const columns = [
  {
    field: "id",
    headerName: "Emp Id",
    valueGetter: (value, row) => `NKS-${row.id}`,
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "dateOfJoning",
    headerName: "Date of Joining",
    type: "Date",
    width: 210,
    valueGetter: (value, row) =>
      `${moment(row.dateOfJoning).format("DD/MM/YYYY")}`,
  },
  {
    field:'SPLallowance',
    headerName:"Special Allowance",
    type: 'text',
    width: 210,
    editable: true,
    headerClassName: "blinkItem",
    renderCell: (params) => {
      const { id, SPLallowance } = params.row;
      return <TextField className="blinkIteminput" value={SPLallowance} />;
    },
  },
];

const SelectEmp = () => {
  const [error, setError] = useState(null);
const [sitedata,setSitedata]=React.useState();
let stateFromLocalStorage = sessionStorage?.getItem('dataGridState');

const stateemplist=sessionStorage?.getItem('selectedemp')?.split(',');

const result=stateemplist?.map(number=>parseInt(number))

const [initialState, setInitialState] = React.useState();

// const [selectedEmp, setSelectedEmp] = React.useState( localStorage?.getItem('selectedemp'));
const [selectedEmp, setSelectedEmp] = React.useState(result );
let currentState=null;








console.log("checking emplist",result)
//const result = numbers.map(number => parseInt(number));
console.log("checking emp",sessionStorage?.getItem('selectedemp'))







const handleSelectionChange=(item)=>{
  
  
  
  console.log("selection fuction",item);
  if(item.length>0)
    {
  setSelectedEmp(item);
  sessionStorage.setItem('selectedemp',item)
    }

  //console.log("selection fuction",item);

}


//console.log("outer current state",stateFromLocalStorage );
const handleCellEditStop = React.useCallback((params) => {

  sessionStorage.setItem('dataGridState',JSON.stringify(currentState));

 // console.log("Cell edit stopped:", JSON.stringify(currentState));
}, []);
//useGridApiEventHandler(apiRef, 'cellEditStop', handleEvent);
const handleStateChange = React.useCallback((params) => {
  
  
  currentState=params.rows.dataRowIdToModelLookup;
 // console.log("State data is",params.rows.dataRowIdToModelLookup,"condition checking",Object.keys(currentState).length)
  try
  {
  if(Object.keys(currentState).length > 0 )
    {
      sessionStorage.setItem('dataGridState',JSON.stringify(currentState));
 
    }
  // console.log("Cell edit stopped:", params.rowSelection );
  sessionStorage.setItem('selectedemp',params.rowSelection)
}
catch{}
}, []);

let sessionsids = [];
  sessionsids.push(sessionStorage.getItem("site.Id"));
  // console.log("sessionsids", sessionsids);
  const newsiteData = sessionsids[0].split(",").map((item) => parseInt(item));
  // console.log("newsessionsids in emp page", newsiteData);

const SentSite = {
  siteId: newsiteData,
};

let sessionsiteids1 = [];
sessionsiteids1.push(sessionStorage.getItem("site.Id"));
const newsiteData1 = sessionsiteids1[0].split(",").map((item) => parseInt(item));
const makepayloadForDate = {
 siteId: newsiteData1,
 billStartDate: sessionStorage.getItem('billStartDate'),
 billEndDate: sessionStorage.getItem('billEndDate'),
}
//console.log('makepayloadForDate',makepayloadForDate)
 

  React.useEffect(()=>{
    if (makepayloadForDate.siteId && sessionStorage.getItem('billStartDate') && sessionStorage.getItem('billEndDate')) {

    axiosHttp
  // .post("/GetSiteEmp",SentSite)
   .post("/GetBillEmp",makepayloadForDate)
  .then((res) => {
  //console.log(res.data.msg);
    if(res.data.msg==="Worker Updated")
    {
   // console.log("success",res.data.data);
   if(res.data.data.length > 0){
  
  const parsedata = res.data.data.map((entry,index) => ({
    id: entry.Id,

    lastName: entry.lastName,
    firstName: entry.firstName,
    fatherSpouseName: entry.fatherSpouseName,
    dateOfJoning: entry.dateOfJoning,
    SPLallowance:entry.SPLallowance// Age is not provided in the original data
  }));

 // console.log("all data",parsedata);

const selectedidlist= parsedata.map((value,index)=>(
  value.id
))
if(!(sessionStorage?.getItem('selectedemp')))
 setSelectedEmp(selectedidlist);
//console.log("for ids",selectedidlist);



 try
 {
 stateFromLocalStorage=JSON.parse(stateFromLocalStorage);
 }catch(error)
 {}
 //console.log("data to parser",stateFromLocalStorage);
 let rows=null
 try
 {
   rows = Object.values(stateFromLocalStorage).map((entry, index) => (
   {
   id: entry.id,
   lastName: entry.lastName,
   firstName: entry.firstName,
   fatherSpouseName: entry.fatherSpouseName,
   dateOfJoning: entry.dateOfJoning,
   SPLallowance:entry.SPLallowance// Age is not provided in the original data
  }

 )
 
 );
 const selectedidlist= rows.map((value,index)=>(
  value.id
))
if(!(sessionStorage?.getItem('selectedemp')))
 setSelectedEmp(selectedidlist);
}
catch(error){console.log("maping error",error)}



stateFromLocalStorage===null|| Object.keys(stateFromLocalStorage).length === 0   ?  setSitedata(parsedata) :  setSitedata(rows);


//  setSitedata(parsedata);


//console.log("my item parsing",rows,"axios data",parsedata);



// const newpayload= [];
// temp.forEach(item => {
//     const values = Object.values(item)[0]; // Get the values of the first (and only) property in each object
//     newpayload.push(values);
// });

// console.log("ks data",newpayload);
//console.log("Ai jason parse is",rows);
 
  
   // console.log("in axios call",sitedata)
    // return(res.data.data);
  }else{
    setError("There is no attendance of employee availance for this bill period.")
    //toast.error("There is no attendance of employee availance for this bill period.")
  }
    }
    else
    {
      alert(res.data.msg);
      console.log("Erro occured");
    }
  })
  .catch((error) => {
    console.log(error);
  });
  
}
},[makepayloadForDate.siteId, sessionStorage.getItem('billStartDate'), sessionStorage.getItem('billEndDate')])



// const rows = [];
//console.log("cheking",sitedata);
 const rows = sitedata===undefined? []:sitedata;

  return (
    <Box sx={{ height: 400, width: '100%' }}>
       {<Typography color="error">{error}</Typography>}
    <DataGrid
      rows={rows}
      columns={columns}
      
      onStateChange={handleStateChange}
      onCellEditStop={handleCellEditStop}
      pageSizeOptions={[1,5,10,15]}
      initialState={{
        pagination:{
          paginationModel:{pageSize:10}
        }
        
      }}
      checkboxSelection
      rowSelectionModel={selectedEmp}
      onRowSelectionModelChange={(item)=>handleSelectionChange(item)}
      disableRowSelectionOnClick
    
      
    />
   
  </Box>
  )
}

export default SelectEmp