import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography,Checkbox,TextField,Button  } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Form } from "formik";

const initialValues = {
  city_id: { name: "", id: null, state: "" }
};

const cities = [{
    state: "Illinois",
    name: "Chicago",
    id: 3,
}, {
    state: "Texas",
    name: "Houston",
    id: 2
}, {
    state: "California",
    name: "Los Angeles",
    id: 1
}, {
    state: "New York",
    name: "New York City",
    id: 4
}];

// const baseURL = "http://192.168.1.121:8089/api/GetEmp";

const MyProfile = () => {
   const [emplist, setEmplist] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [empOptions, setEmpOptions] = useState([]);
  const [userRoles, setUserRoles] = useState();
  let empNames = [];
  

 const getemployee = ()=>{
  axios
  .get('http://192.168.1.121:8089/api/GetEmp')
  .then((response) => {
    console.log(response.data);
   // setEmplist(response.data.data);
   
   empNames = response.data.data;
   console.log('empNames',empNames);
   setEmplist(empNames.map((emp)=>{return emp.firstName})); 
console.log('emplist',emplist);
  })
  .catch((error) => {
    setError(error);
  });
 } 

 const getRole = ()=>{
  axios
  .get('http://192.168.1.121:8089/api/GetRole')
  .then((response) => {
     console.log(JSON.stringify('roles',response.data.data));
    setUserRoles(response.data.data.map((role)=>{return role.RoleName}));   
  //  console.log('userRoles',userRoles);
   
  })
  .catch((error) => {
    setError(error);
  });
 }
  
  
  useEffect(() => {
    getemployee();
    getRole();
  }, []);

  const handleCheckboxChange = (event) => {
  
    setSelectedCheckbox(event.target.value)
   
  }
// console.log('emplist',emplist)
  
  // if (error) return `Error: ${error.message}`;
  // if (!emplist) return "No post!";

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
 const emps =   [
      {
        "Id": 1,
        "Emp_ID": null,
        "firstName": "Ashish",
        "lastName": "Wangi",
        "gender": "Male",
        "dateOfBirth": "2005-12-30T18:30:00.000Z",
        "aadharNumber": 534534555555,
        "fatherSpouseName": "Ashok",
        "nationality": "",
        "panNumber": "aswef3332f",
        "esicIP": "4234234",
        "pfNumber": "4234234",
        "bankName": "Vyapari Bank",
        "bankAccountNumber": "2121215445",
        "ifscCode": "VP000025",
        "siteLocaion": "Sat Rasta",
        "categoryWork": "High Skilled",
        "designation": "Packer Operator",
        "serviceBookNumber": "5435345",
        "serviceRemark": "Very Good",
        "dateOfJoning": "2024-04-02T18:30:00.000Z",
        "lwf": "xvxcvxcv",
        "presentAddress": "Murarji Peth, Sidhajin Hos, Solapur, Maharashtra 413001",
        "permanentAddress": "Murarji Peth, Sidhajin Hos, Solapur, Maharashtra 413001",
        "cityName": "Solapur",
        "markOfIdentification": "Mule on right hand",
        "mobileNumber": 9766474875,
        "alternateMobileNumber": 976647422
      },
      {
        "Id": 2,
        "Emp_ID": null,
        "firstName": "Angad",
        "lastName": "Mane",
        "gender": "Male",
        "dateOfBirth": "2005-12-30T18:30:00.000Z",
        "aadharNumber": 534534555555,
        "fatherSpouseName": "Deepak",
        "nationality": "",
        "panNumber": "angad0015m",
        "esicIP": "3243",
        "pfNumber": "443424",
        "bankName": "HDFC bank",
        "bankAccountNumber": "021214545",
        "ifscCode": "HDFC01245",
        "siteLocaion": "Navi Peth",
        "categoryWork": "Semi Skilled",
        "designation": "Loader",
        "serviceBookNumber": "3545345",
        "serviceRemark": "xdsfdsf",
        "dateOfJoning": "2024-04-01T18:30:00.000Z",
        "lwf": "zczx",
        "presentAddress": "Hiraj Naka",
        "permanentAddress": "Hiraj Naka",
        "cityName": "Solapur",
        "markOfIdentification": "Giddu",
        "mobileNumber": 3424343444,
        "alternateMobileNumber": 5345
      }]

    const options = ['Ashish', 'Angad', 'Kashinath1', 'Yogesh', 'Kashinath', 'Suraj', 'Dipika'];
    console.log('options',options);

    
   console.log('empnames',empNames);
    const [value, setValue] = React.useState(emplist[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [inputValue1, setInputValue1] = React.useState('');
    const [rolesvalue, setRolesvalue] = React.useState(userRoles[0]);
    console.log(emps)
    console.log(value)
    

    const submit = values => {
      alert(`Value for city_id is: ${JSON.stringify(values.city_id)}`);
    };

  return ( <>
  {/* <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        // options={options}
        options={emplist}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select employee" />}
      />
    </div>

    <div>
      <div>{`value: ${rolesvalue !== null ? `'${rolesvalue}'` : 'null'}`}</div>
      <div>{`inputValue1: '${inputValue1}'`}</div>
      <br />
      <Autocomplete
        value={rolesvalue}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue1}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo1"
        // options={options}
        options={userRoles}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select employee" />}
      />
    </div> */}
  {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      value={countries[0]}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
isOptionEqualToValue={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Choose a Employee" />}
    /> */}
          {/* {emplist.map((emp, index) => (
        <Grid key={emp.Id} p={2} sx={{backgroundColor:'#eeeeee'}}>
          
          <Typography gutterBottom>
          <FormControlLabel
          
          value={emp.Id}
          checked={emp.Id == selectedCheckbox}
          control={<Checkbox onChange={handleCheckboxChange} />}
          label={`${emp.firstName}`+ ' ' +`${emp.lastName}`}
          labelPlacement="left"
        />
          </Typography>

        </Grid>
       
      ))} */}
      <Formik initialValues={initialValues} onSubmit={submit}>
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Autocomplete
            id="city_id"
            name="city_id"
            options={cities}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            onChange={(e, value) => {
              console.log(value);
              setFieldValue(
                "city_id",
                value !== null ? value : initialValues.city_id
              );
            }}
            renderInput={params => (
              <TextField
                margin="normal"
                label="Cities"
                fullWidth
                name="city_id"
                {...params}
              />
            )}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
        </>
     
  )
}



export default MyProfile