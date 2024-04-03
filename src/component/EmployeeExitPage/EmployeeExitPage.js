// import React from 'react';
import { Grid, Typography, TextField,MenuItem,FormControl,Select,InputLabel } from '@mui/material';
import { InputField, SelectField, DatePickerField, TextareaField } from '../../global/FormFields';
import EmployeeList from '../EmployeeList/EmployeeList';
import axios from "axios";
import React, { useState, useEffect} from "react";

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

      return (
        
        <>
      
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Users"
          onChange={handleChange}
        >{users.map((user, index) => (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
      {selectedUser && (
        <Grid item xs={12} md={6}>
          <Typography>Name: {selectedUser.name}</Typography>
          <Typography>Id: {selectedUser.id}</Typography>
          <Typography>username: {selectedUser.username}</Typography>
          <Typography>phone: {selectedUser.phone}</Typography>
          <Typography>mail: {selectedUser.email}</Typography>
          <Typography>website: {selectedUser.website}</Typography>
        </Grid>
      )}
      </Grid>
    
        </>
      );
}