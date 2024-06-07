import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography,Checkbox,TextField,Button,FormControl,InputLabel,Select,OutlinedInput,MenuItem,ListItemText,Box,Chip,CircularProgress } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosHttp from "../../../AxiosInstance";

const initialValues = {};
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

  const getEmployeeList = async() => {
    setLoading(true);
    await axiosHttp
      .get("/GetEmpAdmin")
      .then((response) => {
        setLoading(false);        
        setEmpList(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const getRole = async() => {
    setLoading(true);
    await axiosHttp
      .get("/GetRoleIdAdmin")
      .then((response) => {
        setLoading(false);
        setUserRoles(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const getLocation = async() => {
    setLoading(true);
    await axiosHttp
      .get("/GetProj_Site")
      .then((response) => {
        setLoading(false);
        setSitelocationlist(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

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
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submit = async (values) => {
    let valuestoprint;
    valuestoprint = selectedSite;
    let userPromotePayload = {};

    if (
      !selectedEmps ||
      !values.selectedEmpId ||
      !values.empRoleId ||
      selectedSite.length === 0
    ) {      
      toast.error("Please fill in all required fields.");
      return;
    }

    userPromotePayload = {
      userName: `NKS-${selectedEmps?.Id || ""}`,
      empId: `${values.selectedEmpId}`,
      sitelist: valuestoprint,
      roleId: `${values.empRoleId}`,
    };
   
    // post api call for attendance with required payload
    try {
      setLoading(true); 
      const res = await axiosHttp.post("/PramoteUser", userPromotePayload);
      toast.success(res.data.msg);
      setLoading(false); 
      navigate("/access-management");
    } catch (err) {
      setLoading(false); 
    }
  };

  if (loading)
    return (
      <>
        Loading...
        <CircularProgress />
      </>
    );
  if (!empList)
    return (
      <Typography color="error" sx={{color:'red'}}>
        {" "}
        No data available please contact with admin.
      </Typography>
    );
  if (error)
    return (
      <Typography color="error">{error.message}</Typography> &&
      toast.error(error.message)
    );

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            <Autocomplete
              id="empList"
              name="empList"
              options={empList}
              getOptionLabel={(option) =>
                option.firstName + " " + option.lastName
              }
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
                value={`NKS-${selectedEmps?.Id || ""}`}
              />
            )}

            <Autocomplete
              id="userroles"
              name="userroles"
              options={userRoles}
              getOptionLabel={(option) => option.RoleName}
              style={{ width: 300 }}
              onChange={(e, value) => {
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