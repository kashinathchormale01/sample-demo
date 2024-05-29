import React from 'react'
import { CssBaseline,Container,Box } from '@mui/material' 
import Steper from './Steper'
import { useLocation } from 'react-router-dom';
const EmployeeEnroll = (selecctedid) => {
  const location = useLocation();
  const obj={
    Id:"-1",
    dob:null,
    doj:null
  }
  selecctedid= {sentid:location.state===null ? obj : location.state };
  // console.log("accessing state", location.state);
  return (
    <CssBaseline>
    <Container component={Box} p={4} style={{textAlign:'center'}}>
      <label style={{fontSize:'large'}}>Employee Register</label>
     <Steper {...selecctedid}/>
    </Container>
    </CssBaseline>
  )
}

export default EmployeeEnroll