// import React from 'react';
import { Grid, Typography, TextField,MenuItem,FormControl,Select,InputLabel,Box, Paper, Autocomplete } from '@mui/material';
import { InputField, SelectField, DatePickerField, TextareaField } from '../../global/FormFields';
import EmployeeList from '../EmployeeList/EmployeeList';
import axios from "axios";
import React, { useState, useEffect} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const genderlist = [
    {
      value: '1',
      label: 'Male'
    },
    {
      value: '2',
      label: 'Female'
    },
    {
      value: '3',
      label: 'Other'
    }
  ];

  const nationalitylist = [
    {
      value: '0',
      label: 'India'
    },
    {
        value: '1',
        label: 'USA'
    }
  ];

  const educationLevellist = [
    {
        value: undefined,
        label: 'None'
    },
    {
      value: '1',
      label: 'BA'
    },
    {
        value: '2',
        label: 'BCOM'
    },
    {
        value: '3',
        label: 'HSC'
    }
  ];

export default function EmpExitForm(props) {
  const [users, setUsers] = React.useState();
  const [error, setError] = useState(null);
  const [age, setAge] = React.useState('');
  console.log('age',age);
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find(user=> user.id === parseInt(selectedUserId));
    setAge(event.target.value);
    console.log('current user',selectedUser);
    setSelectedUser(selectedUser);
  };
    
 const baseUrl = 'https://jsonplaceholder.typicode.com/users';

    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setUsers(response.data);
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        setLoading(true);
      } catch (error) {
        // Handle error
        setError(error);
        console.error(error);
      }
    };
    
    // fetchData();

    useEffect(() => {
      fetchData();
    }, []);


    if (error) return `Error: ${error.message}`;
  if (!users) return "No users!"

  const countries = [
    { code: "AD", name: "Andorra", phone: "376" },
    { code: "AI", name: "Anguilla", phone: "1-264" },
    { code: "AL", name: "Albania", phone: "355" },
    { code: "AM", name: "Armenia", phone: "374" },
    { code: "AO", name: "Angola", phone: "244" },
    { code: "AQ", name: "Antarctica", phone: "672" },
    { code: "AR", name: "Argentina", phone: "54" },
    { code: "AS", name: "American Samoa", phone: "1-684" },
    { code: "AT", name: "Austria", phone: "43" }
    ];

      return (
        <>

<Box container 
    sx={{minWidth: "50%",
      
      '& > :not(style)': {
        m: 1,  
        p:4     
      }
    }}
  >   
    <Paper elevation={3} >

          <Grid
            mt={5}
            container>
            <Grid item xs={6} md={4}>
              {/* <FormControl fullWidth sx={{minWidth:'300px'}}>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Users"
                  onChange={handleChange}
                >
                  {users.map((user, index) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
               
              {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={users.map((option) => option.name)}
      sx={{ width: 300 }}
      value={age}
      renderInput={(params) => <TextField {...params} label="Users" />}
    /> */}

<Autocomplete
id="country-select-demo"
sx={{ width: 300 }}
options={countries}
getOptionLabel={(option) => option.name}
isOptionEqualToValue={(option) => option.name}
value={countries[0]}
renderInput={(params) => (
    <TextField {...params}
      label="Choose a country"

/>
)}
/>

   
   
            </Grid>
          </Grid>

          
            {selectedUser && (
              <>
                <Grid container>
                      <TextField
                        id="outlined-helperText"
                        label="ID"
                        value={selectedUser.id}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        
                      />
                    </Grid>
                    <Grid container>
                      <TextField
                        id="outlined-helperText"
                        label="Name"
                        value={selectedUser.name}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                       
                      />
                    </Grid>
                 
                  <Grid container>
                    <TextField
                      id="outlined-helperText"
                      label="phone"
                      value={selectedUser.phone}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      
                    />
                  </Grid>   
                  
              </>
            )}
          </Paper>
  </Box>
        </>
      );
}