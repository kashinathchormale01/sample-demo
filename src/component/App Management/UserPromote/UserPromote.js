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
     setUserRoles(response.data.data); 
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
    setSitelocationlist(response.data.data); 
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
      let userPromotePayload = {};

      if (!selectedEmps || !values.selectedEmpId || !values.empRoleId || selectedSite.length === 0) {
        // Show an error message or handle the case where required fields are missing
        toast.error("Please fill in all required fields.");
        return;
      }

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