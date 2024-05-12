import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography,Checkbox,TextField,Button,FormControl,InputLabel,Select,OutlinedInput,MenuItem,ListItemText,Box,Chip,ButtonGroup    } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  //city_id: { RoleName: "", Id: null,firstName:""},
  // empId:{Id:null, firstName:""},
  // roleId:{Id:null, RoleName:""},

};
const SendSiteSchema = {
  siteId: "",
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
    { Id:121,
      siteName: "SaRasta",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { Id:22,
      siteName: "Pune naka",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { Id:354,
      siteName: "Awanti nagar",
    siteArea: "Solapur",
    creationDate: "0002121"},
    { Id:44,
      siteName: "bijapur ves",
    siteArea: "Solapur",
    creationDate: "0002121"}
  ]

  console.log('sitesloc',sitesloc)
  
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
  const navigate = useNavigate();
    const [empList, setEmpList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [sitelocationlist, setSitelocationlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSite, setSelectedSite] = React.useState([]);
  const [selectedEmps, setSelectedEmps] = React.useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Initially disabled

  const [siteIdError, setSiteIdError] = useState(false); // State for siteId validation
     console.log('selectedSite',selectedSite);
     console.log('sitelocationlist',sitelocationlist)

    const getEmployeeList = ()=>{
      axios
      .get('/GetEmpAdmin')
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
    .get('/GetRoleIdAdmin')
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

    const submit = async(values) => {

      let valuestoprint;
      valuestoprint = selectedSite;
      console.log('Value for aceess is:',selectedSite);
      console.log('Value for aceess is:',values);
      console.log('valuestoprint:',valuestoprint);
      let userPromotePayload = {};
      userPromotePayload = {
        userName: `NKS-${selectedEmps?.Id || ''}`,
        empId: `${values.selectedEmpId}`,
        sitelist: valuestoprint,
        roleId: `${values.empRoleId}`
      }
      console.log('payload:',JSON.stringify(userPromotePayload));
       // post api call for attendance with required payload
  try {
    setLoading(true); // Set loading before sending API request
    const res = await axios.post("/PramoteUser", userPromotePayload);
    const response = res; // Response received
    toast.success(res.data.msg);
    setLoading(false); // Stop loading
    navigate('/access-management');
  } catch (err) {
    setLoading(false); // Stop loading in case of error
    console.error(error);
  }  

    //  alert(`Value for aceess is: ${JSON.stringify(values)}`+`${(selectedSite)}`);
    };

    if (!empList) return <Typography color="error"> No data available please contact with admin.</Typography>

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            <Autocomplete
              id="empList"
              name="empList"
              options={empList}
              getOptionLabel={(option) => option.firstName}
              style={{ width: 300 }}
              onChange={(e, value) => {
                console.log(value);
                setSelectedEmps(value);
                setFieldValue(
                  "selectedEmpId",
                  value.Id !== null ? value.Id : initialValues.emp.Id
                );
              }}
              renderInput={(params) => (
                <TextField
                  margin="normal"
                  label="Select Employee"
                  fullWidth
                  name="selectedEmpId"
                  {...params}
                />
              )}
            />

            {selectedEmps && (
              <TextField
                Id="SelectedEmpId"
                label="Selected Employee Id"
                value={`NKS-${selectedEmps?.Id || ''}`}
              />
            )}

            <Autocomplete
              id="userroles"
              name="userroles"
              options={userRoles}
              getOptionLabel={(option) => option.RoleName}
              style={{ width: 300 }}
              onChange={(e, value) => {
                //console.log(value);
                setFieldValue(
                  "empRoleId",
                  value.Id !== null ? value.Id : initialValues.role.Id
                );
              }}
              renderInput={(params) => (
                <TextField
                  margin="normal"
                  label="Select Employee Role"
                  fullWidth
                  name="role"
                  {...params}
                />
              )}
            />

            <FormControl sx={{ marginTop: "10px", width: 300 }}>
              <InputLabel id="multiple-location-label">
                Select Location
              </InputLabel>
              <Select
                labelId="multiple-location-label"
                id="multiple-location"
                name="multiple-location"
                multiple
                value={selectedSite}
                onChange={handleChangeselect}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((item) => (
                      <Chip
                        key={item.Id}
                        label={
                          sitelocationlist?.find((e) => e.Id === item).siteName
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {sitelocationlist.map((site) => (
                  <MenuItem key={site.Id} value={site.Id}>
                    <Checkbox checked={selectedSite.includes(site.Id)} />
                    <ListItemText primary={site.siteName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              className="buttonMain"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UserPromote