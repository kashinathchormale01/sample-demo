import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography,Checkbox,TextField,Button,FormControl,InputLabel,Select,OutlinedInput,MenuItem,ListItemText,Box,Chip    } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Form } from "formik";

const initialValues = {
  //city_id: { RoleName: "", Id: null,firstName:""},
  emp:{Id:null, firstName:""},
  role:{Id:null, RoleName:""},
  location: {siteId:"", siteName:""},

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

const Roles = [
  { Id: 1, RoleName: "Admin" },
  { Id: 2, RoleName: "Super" },
  { Id: 3, RoleName: "Supervisor" },
  { Id: 4, RoleName: "HR" },
  { Id: 5, RoleName: "Accountant" },
];

const emps = [
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

  const sitesloc = [
    { siteId:121,
      siteName: "SaRasta",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { siteId:22,
      siteName: "Pune naka",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { siteId:354,
      siteName: "Awanti nagar",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { siteId:44,
      siteName: "bijapur ves",
    siteArea: "Solapur",
    creationDate: "0002121"}
  ]

  
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const UserPromote = () => {
    const [empList, setEmpList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [sitelocationlist, setSitelocationlist] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSite, setSelectedSite] = React.useState([]);
     console.log('selectedSite',selectedSite)

    const getEmployeeList = ()=>{
      axios
      .get('/GetEmp')
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
       // setEmplist(response.data.data);
       
      //  empNames = response.data.data;
      //  console.log('empNames',empNames);
      setEmpList(response.data.data); 
    // console.log('emplist',emplist);
      })
      .catch((error) => {
        setError(error);
      });
     } 

  const getRole = ()=>{
    axios
    .get('/GetRole')
    .then((response) => {
      console.log(JSON.stringify(response.data.data));
     // setEmplist(response.data.data);
     
    //  empNames = response.data.data;
    //  console.log('empNames',empNames);
    setUserRoles(response.data.data); 
  // console.log('emplist',emplist);
    })
    .catch((error) => {
      setError(error);
    });
   } 

   const getLocation = ()=>{
    axios
    .get('/GetProj_Site')
    .then((response) => {
      console.log(JSON.stringify(response.data.data));
     // setEmplist(response.data.data);
     
    //  empNames = response.data.data;
    //  console.log('empNames',empNames);
    setSitelocationlist(response.data.data); 
  // console.log('emplist',emplist);
    })
    .catch((error) => {
      setError(error);
    });
   } 

   useEffect(() => {
     getEmployeeList();
     getRole();
     getLocation();
  }, []);

  const handleChangeselect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSite(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    const submit = values => {
      alert(`Value for aceess is: ${JSON.stringify(values)}`);
    };
  return (
    <> 
      <Formik initialValues={initialValues} onSubmit={submit}>
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          

<Autocomplete
            id="empList"
            name="empList"
            options={empList}
            getOptionLabel={option => option.firstName}
            style={{ width: 300 }}
            onChange={(e, value) => {
              console.log(value);
              setFieldValue(
                "emp",
                value !== null ? value : initialValues.emp
              );
            }}
            renderInput={params => (
              <TextField
                margin="normal"
                label="empList"
                fullWidth
                name="emp"
                {...params}
              />
            )}
          />

<Autocomplete
            id="city_id"
            name="city_id"
            options={userRoles}
            getOptionLabel={option => option.RoleName}
            style={{ width: 300 }}
            onChange={(e, value) => {
              //console.log(value);
              setFieldValue(
                "role",
                value !== null ? value : initialValues.role
              );
            }}
            renderInput={params => (
              <TextField
                margin="normal"
                label="userRoles"
                fullWidth
                name="role"
                {...params}
              />
            )}
          />

<FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Location</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name="demo-multiple-checkbox"
          multiple
          value={selectedSite}
          onChange={handleChangeselect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((siteId) => (
          <Chip key={siteId} label={sitesloc?.find(e => e.siteId === siteId).siteName} />
          ))}
      </Box>)}
          MenuProps={MenuProps}
        >
          {sitesloc.map((site) => (
            <MenuItem key={site.siteId} value={site.siteId}>
              <Checkbox checked={selectedSite.includes(site.siteId)} />
              <ListItemText primary={site.siteName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
        </>
  )
}

export default UserPromote