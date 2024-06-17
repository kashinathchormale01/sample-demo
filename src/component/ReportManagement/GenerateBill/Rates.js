import React,{useState,useEffect} from 'react';
import {Box, TextField} from '@mui/material';
import { DataGrid  } from '@mui/x-data-grid';
import axiosHttp from '../../../AxiosInstance';
import { Category } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90,
    enableSorting: true,
   }, 
  {
    field: 'CategoryWork',
    headerName: 'Catagory Name',
    type: 'text',
    width: 210,
  },
  {
    field:'RoleName',
    headerName:"Role Name",
    type: 'text',
    width: 210,    
  },
  {
    field:'Basic',
    headerName:"Basic Allowance(Editable)",
    type: 'text',
    width: 210,
    editable: true,
    headerClassName: 'blinkItem',
    renderCell: (params) => {    
      const { id, Basic } = params.row;
      return <TextField className='blinkIteminput' value={Basic} />;
    }    
  },
  {
    field:'otherAllowance',
    headerName:"Other Allowance(Editable)",
    type: 'text',
    width: 210,
    editable: true,
    headerClassName: 'blinkItem',
    renderCell: (params) => {    
      const { id, otherAllowance } = params.row;
      return <TextField className='blinkIteminput' value={otherAllowance} />;
    }    
  },
];

const Rates = () => {
  const [sitedata,setSitedata]=React.useState();
  let stateFromLocalStorage = sessionStorage?.getItem('rateGridState');
  let selectedempsFromStorage = sessionStorage?.getItem('selectedEmployee');
  // console.log('selectedempsFromStorage',selectedempsFromStorage)
  const [initialState, setInitialState] = useState();
  let currentState=null; 
  
  // const handleCellEditStop = React.useCallback((params) => {
  
  //  localStorage.setItem('rateGridState',JSON.stringify(currentState));
  //  console.log("Cell edit stopped:", JSON.stringify(currentState));
  // }, []);
  const handleStateChange = React.useCallback((params) => {
    
    
    currentState=params.rows.dataRowIdToModelLookup;
    //console.log("State data is",params.rows.dataRowIdToModelLookup,"condition checking",Object.keys(currentState).length)
    try
    {
     if(Object.keys(currentState).length > 0 )
      sessionStorage.setItem('rateGridState',JSON.stringify(currentState));
    //console.log("Cell edit stopped:", params.rows.dataRowIdToModelLookup);
  }
  catch{}
  }, []);  

    useEffect( ()=>{
    
      axiosHttp
   .post("/GetBillEmpCatRole",JSON.parse(sessionStorage.getItem('selectedEmployee')))
   .then((res) => {
    // console.log('GetBillEmpCatRole',res.data.data);
     if(res.data.msg==="billempcatrole")
     {
    // console.log("success",sessionStorage?.getItem('rateGridState')?.length);
   if(sessionStorage?.getItem('rateGridState')?.length===0 || sessionStorage?.getItem('rateGridState')?.length===undefined)
    {
      // console.log("setting orig data");
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
       console.log('value',value)
   
     rows=[...rows,{id: value.id,
      CategoryWork: value.CategoryWork,
      otherAllowance: undefined,      
     CategoryId:value.CatId,
      RoleName:value.RoleName,
     // Basic: value?.Basic,
    }]
  }
  else
  {
    // console.log('row value',checknewid.otherAllowance)
    //rows[index].otherAllowance=checknewid.otherAllowance
  }
  // console.log('new rows are', rows)

 
   })

 const t=  rows.map((value,index)=>{

  let checknewid=res.data.data.find(o => o.id === value.id);
  if(checknewid&&value!==undefined)
    {
 console.log('deleteion values are', value)
      return value
    }
})

rows=t.filter(item=>item);
console.log('after deleteition', rows)

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
   console.log("data to parser",stateFromLocalStorage);
   let rows=null
   try
   {
     rows = Object.values(stateFromLocalStorage).map((entry, index) => (
     {
     id: entry.id,
     CategoryWork: entry.CategoryWork,
     Basic: entry?.Basic,
     otherAllowance: entry.otherAllowance,
     RoleName:entry.RoleName,
     CategoryId:entry.CatId
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
  // console.log("cheking",sitedata);
  // const rows =parsedata;  // Data is Set Here
  //let filteredData;

  // useEffect(() => {
   
  //     axiosHttp.post('/GetBillEmpCatRole', JSON.parse(selectedempsFromStorage))
  //       .then((res) => {
  //         const filteredData = sitedata?.map((row) => ({
  //           ...row,
  //           backgroundColor: res.data.data.some((item) => item.id !== row.id) ? '#ffff00' : '#FFEB3B',
  //         }));
  //         setSitedata(filteredData);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
    
  // }, []);
  
 const rows = sitedata===undefined? []:sitedata;  // Data is Set Here

    return (
      <Box sx={{  width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
       // getRowId={(row) =>  generateRandom()}
        onStateChange={handleStateChange}
        pageSizeOptions={[1,5,10,15]}
        initialState={{
          pagination:{
            paginationModel:{pageSize:10}
          }
        }}
        //checkboxSelection
        disableRowSelectionOnClick
        //getRowClassName={(params) => (params.row.backgroundColor ? 'custom-row' : '')}
      />
      
    </Box>
    )
}

export default Rates