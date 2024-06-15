import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef  } from '@mui/x-data-grid';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { GridFilterModel } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  // },
  {
    field: 'CategoryWork',
    headerName: 'catagory Name',
    type: 'text',
    width: 210,
    // editable: true,
  },
  {
    field:'RoleName',
    headerName:"Role Name",
    type: 'text',
    width: 210,
   // editable: true,

    
  },
  {
    field:'otherAllowance',
    headerName:"Other Allowance",
    type: 'text',
    width: 210,
    editable: true,

    
  },
];

// const parsedata = [
//   { id: 1, CatId: '4', otherAllowance: 14,CategoryWork:"Skilled",RoleName:"Loader" },
//   { id: 2, CatId: '3',  otherAllowance: 31,CategoryWork:"Unskilled",RoleName:"Worker" },
//   { id: 3, CatId: '1',  otherAllowance: 31,CategoryWork:"High Skilled" ,RoleName:"HR"},
//   { id: 4, CatId: '2',  otherAllowance: 11,CategoryWork:"Semi Skill",RoleName:"Packer B.T." },
  
// ];



const Rates = () => {
  const [sitedata,setSitedata]=React.useState();
  let stateFromLocalStorage = sessionStorage?.getItem('rateGridState');
  const [initialState, setInitialState] = React.useState();
  let currentState=null;
  
  
 // console.log("outer current state",stateFromLocalStorage );
  const handleCellEditStop = React.useCallback((params) => {
  
  //  localStorage.setItem('rateGridState',JSON.stringify(currentState));
   // console.log("Cell edit stopped:", JSON.stringify(currentState));
  }, []);
  //useGridApiEventHandler(apiRef, 'cellEditStop', handleEvent);
  const handleStateChange = React.useCallback((params) => {
    
    
    currentState=params.rows.dataRowIdToModelLookup;
    //console.log("State data is",params.rows.dataRowIdToModelLookup,"condition checking",Object.keys(currentState).length)
    try
    {
     if(Object.keys(currentState).length > 0 )
      {
      sessionStorage.setItem('rateGridState',JSON.stringify(currentState));
      //console.log("rows",rows,"/nstorage",currentState);
      }
    //console.log("Cell edit stopped:", params.rows.dataRowIdToModelLookup);
  }
  catch{}
  }, []);
  
  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    } 
    return retVal;
}

    React.useEffect( ()=>{
    

   // const tempdata=[8,9,10];
   const tempdata=[8,9,10,22,23];

     let config = {
      headers: {
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMSIsImlhdCI6MTcxODM0NzQ3MiwiZXhwIjoxNzE4NDMzODcyfQ.nUEl3z-qZ5HRXqhJIKOOXqng90DGRvnlJ-Hfgo6dJ8I'
      }
    }

      axios
   .post("http://localhost:8089/api/GetBillEmpCatRole",tempdata,config)
   .then((res) => {
    //console.log("response is",res);
     if(res.data.msg==="billempcatrole")
     {
    console.log("success",sessionStorage?.getItem('rateGridState')?.length);
   if(sessionStorage?.getItem('rateGridState')?.length===0||sessionStorage?.getItem('rateGridState')?.length===undefined)
    {
      console.log("setting orig data");
   setSitedata(res.data.data);

    }
    else
    {
   res.data.data.map((value,index)=>{
    let checknewid=Object.values(stateFromLocalStorage).find(o => o.id === value.id);
if(!checknewid)
  {
     
    // stateFromLocalStorage=Object.values(stateFromLocalStorage).push({id: value.id,
    //   CategoryWork: value.CategoryWork,
    //   otherAllowance: value.otherAllowance,
    //   RoleName:value.RoleName})
    //   console.log('value',index,":", Object.values(stateFromLocalStorage),"checkid",checknewid)
   
     rows=[...rows,{id: value.id,
      CategoryWork: value.CategoryWork,
      otherAllowance: undefined,
      RoleName:value.RoleName}]
  }
  else
  {
    console.log('row value',checknewid.otherAllowance)
    //rows[index].otherAllowance=checknewid.otherAllowance
  }
  console.log('new rows are', rows)

 
   })

 const t=  rows.map((value,index)=>{

  let checknewid=res.data.data.find(o => o.id === value.id);
  if(checknewid&&value!==undefined)
    {
console.log('deleteion values are', value)
      return value
    }
})
console.log('after deleteition', t.filter(item=>item))
rows=t.filter(item=>item);


sessionStorage.setItem('rateGridState',JSON.stringify(rows));
setSitedata(rows)

  
    }
  //  console.log("in axios call",res.data.data)
     // return(res.data.data);
      
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




     // console.log("all data",parsedata);
  
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
     CategoryWork: entry.CategoryWork,
     otherAllowance: entry.otherAllowance,
     RoleName:entry.RoleName// Age is not provided in the original data
   
    }
   )
   
   );
  }
  catch(error){
    // console.log("maping error",error)
  }
  
  
  
  stateFromLocalStorage===null|| Object.keys(stateFromLocalStorage).length === 0   ?  setSitedata([]) :  setSitedata(rows);
  
  
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

  },[])
  
  
  
  // const rows = [];
  console.log("cheking",sitedata);
  // const rows =parsedata;  // Data is Set Here
 const rows = sitedata===undefined? []:sitedata;  // Data is Set Here

const hideiddata=[3,4,5]
 
  
    return (
      <Box sx={{  width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
       // getRowId={(row) =>  generateRandom()}
        onStateChange={handleStateChange}
        onCellEditStop={handleCellEditStop}
        pageSizeOptions={[1,5,10,15]}
        initialState={{
          pagination:{
            paginationModel:{pageSize:10}
          }
          
        }}
        //checkboxSelection
        disableRowSelectionOnClick
      
  //  filterModel={{
  //   items:[{field:'id'}],
  // quickFilterValues: ['3' ],
    
      
     
     
    // items: [hideiddata.map((value,index)=>{
    //   return({ field: 'id', operator: 'equals', value: '3' })
  //   // })]
  //  }}

    
      />
      
    </Box>
    )
}

export default Rates