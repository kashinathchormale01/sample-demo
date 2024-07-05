import React, { useMemo, useState,useEffect } from "react";
import { Formik, Form, } from 'formik';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  TableHead,
  TableRow,
  Paper,
  Typography,Box,Chip,CircularProgress
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import Button from "@mui/material/Button";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from "react-toastify";
import axiosHttp from "../../../AxiosInstance";
import { useNavigate } from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#f1f1f1",
  },
}));

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

const initialValues = {
  siteId: "",
};

const dateOffset = (date, offset) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + offset);
  return newDate;
};

const getFirstDayOfWeek = (date) => {
  const day = (date.getDay() + 6) % 7; 
  return dateOffset(date, -day);
};

const weekDayFormat = { weekday: "short", month: "short", day: "numeric" };

export const EmployeeTimeSheet = () => {
  /**
   * site locationlist state
   */
  const [sitelocationlist, setSitelocationlist] = useState();
  const [error, setError] = useState(null);
  const [selectedSite, setSelectedSite] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [emplistbylocation, setEmplistbylocation] = useState();
  const [getAttendanceres, setGetAttendanceres] = useState([]);
  const [weekoffday, setWeekoffday] = useState([]);   
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  /**
   * week start date
   */
  const [startDate, setStartDate] = useState(getFirstDayOfWeek(new Date()));
  /**
   * Week end date
   */
  const isFutureStartDate = useMemo(() => startDate > new Date(), [startDate]);

  const [monthly, setMonthly] = React.useState(true);
  const [data, setData] = useState([]);
  
  const handlePreviousWeek = () => {
    if(monthly === true){
    setStartDate((currDate) => dateOffset(currDate, -31));
    }else{
    setStartDate((currDate) => dateOffset(currDate, -7));
    }
  };

  const handleNextWeek = () => {
    if(monthly === true){
      setStartDate((currDate) => dateOffset(currDate, 31));
      }else{
      setStartDate((currDate) => dateOffset(currDate, 7));
      }
  };  

  const getValue = (index, date) => {
    const key = date.toLocaleDateString("en-US");
    return data[index].sheet[key] ?? "";
  };

  const setValue = (index, date, value) => {
    const key = date.toLocaleDateString("en-US");
    setData((prevData) => {
      const newData = [...prevData];
      // remove key if empty
      if (value === "") delete newData[index].sheet[key];
      else newData[index].sheet[key] = value;
      return newData;
    });
  };
  
  const handleCalendarTableWeekly = () => {
    setMonthly(false);
  };

  const handleCalendarTableMonthly = () => {
    setMonthly(true);
  };

  const getTotal = (index, dates) => {
    return dates.reduce((total, date) => {
      const val = 1 * getValue(index, date);
      return total + val;
    }, 0);
  };

  const weekDates = Array.from({ length: monthly ? 32 : 7 }, (_, i) =>
    dateOffset(startDate, i)
  );

  const handleDateChange = (date) => {
    setDateValue(date);
    const firstDayOfWeek = getFirstDayOfWeek(date.$d);
    setStartDate(firstDayOfWeek);
  };

 
  const loadSiteLocation = async () => {  
    try {
      setLoading(true);
      let result = await axiosHttp.get('/GetProj_Site');
      setSitelocationlist(result.data.data);          
      setLoading(false);
      // Work with the response...
  } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
          // Anything else
          setLoading(false);
          setError(err.message);
      }
  }    
  }; 

const handleSiteSubmit = (values) => {
  setSelectedSite(values);
  if (!values.siteId || values.siteId.length === 0) {
    // Show an error message or handle the case where required fields are missing
    toast.error("Please select site to mark an attendance.");
    return;
  }
  setIsButtonDisabled(true);
  axiosHttp.post("/GetAttendance", values).then((res) => {
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const [year, month, day] = dateString.split("-");
      return `${parseInt(month)}/${day}/${year}`;
    };

    if (!res.data.data || res.data.data.length === 0) {
      setIsButtonDisabled(false);
      setData([]);
      toast.error("Data Not exists.");      
      return;
    }

    const transformData = res.data.data.map((emp) => {
      const sheetObject = {};
      const fullname = emp.firstName + ' ' + emp.lastName;
      if (emp.Sheet) {
        emp.Sheet.split(", ").forEach((date) => {
          sheetObject[formatDate(date)] = true;
        });
      }
      return {
        name: fullname,
        emp_id: emp.Id,
        sheet: sheetObject,
        weekOff:""
      };
    });
    setData(transformData);
    toast.success(res.data.msg);
    setIsButtonDisabled(false);
  });
};

const submitAttendance = async () => {
  let dateKeys = {};
  data.forEach((emp) => {
    Object.entries(emp.sheet).forEach(([date, value],i) => {
      if (i == 0) 
      dateKeys[emp.emp_id] = [];
      if (value === true) {        
        dateKeys[emp.emp_id].push(date);
      }      
    });
  });

  // Create filtered data with emp_id arrays
  const filteredData = Object.keys(dateKeys).map((emp_id) => ({
    emp_id,
    Date: dateKeys[emp_id],
  }));

  const makeAttendancePayload = {
    selectedSite,
    filteredData,
  };  
  // post api call for attendance with required payload
  try {
    setLoading(true); 
    const res = await axiosHttp.post("/Attendance", makeAttendancePayload);
    toast.success(res.data.msg);
    setLoading(true); 
    navigate('/employee-attendance');
  } catch (err) {
    setLoading(false); 
  }  
};

  useEffect(() => {
    loadSiteLocation();
  }, []);

  if (loading) return <div className="overlay"><div className="loadingicon">Loading...<CircularProgress /></div></div>;
  if (!sitelocationlist) return 'No Sites available';

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Formik initialValues={initialValues} onSubmit={handleSiteSubmit}>
          {({
            handleChange,
            isValid,
            dirty,
            isSubmitting,
            values,
            setFieldValue,
          }) => (
            <Form>
              <Autocomplete
                id="userroles"
                name="userroles"
                options={sitelocationlist}
                getOptionLabel={(option) => option.siteName}
                style={{ width: 300 }}
                onChange={(e, value) => {
                  isSubmitting = false;
                  setIsButtonDisabled(false);
                  setFieldValue(
                    "siteId",
                    value !== null ? value.Id : initialValues.siteId
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    label="Select Site Location"
                    fullWidth
                    name="role"
                    {...params}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isButtonDisabled}
              >
                Go
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      {data.length && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{ margin: "20px 0" }}
              components={["DatePicker"]}
            >
              <DatePicker
                label="Select a Date"
                value={dateValue}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Button
                size="medium"
                onClick={handlePreviousWeek}
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
              >
               {monthly ? ( 'Previous Month') : ('Previous Week')}
              </Button>
              {monthly ? (
                <Typography>
                  {` ${weekDates[0].toLocaleDateString(
                    "en-US"
                  )} - ${weekDates[31].toLocaleDateString("en-US")} `}
                </Typography>
              ) : (
                <Typography>
                  {` ${weekDates[0].toLocaleDateString(
                    "en-US"
                  )} - ${weekDates[6].toLocaleDateString("en-US")} `}
                </Typography>
              )}

              <Button
                size="medium"
                onClick={handleNextWeek}
                variant="outlined"
                endIcon={<ArrowForwardIosOutlinedIcon />}
              >
               {monthly ? ( 'Next Month') : ('Next Week')}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              marginLeft={"100px"}
            >
              <Button
                variant="outlined"
                color="warning"
                size="medium"
                endIcon={<ViewWeekIcon />}
                onClick={handleCalendarTableWeekly}
              >
                Weekly view
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="medium"
                endIcon={<CalendarMonthIcon />}
                onClick={handleCalendarTableMonthly}
              >
                Monthly view
              </Button>
            </Stack>
          </Box>
          <TableContainer
            sx={{ maxWidth: "100%", marginTop: "20px" }}
            component={Paper}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      fontSize: "1rem",
                      color: "rgba(96, 96, 96)",
                      backgroundColor: "#b1dbdf",
                    },
                  }}
                >
                  <TableCell>Employee Id</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Total Attendance</TableCell>
                  {weekDates?.map((day) => (
                    <TableCell key={day}>
                      {day.toLocaleDateString("en-US", weekDayFormat)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.sort((a,b)=>a.emp_id > b.emp_id ? 1 : -1)?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{item.emp_id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={getTotal(index, weekDates)}
                        color="success"
                        variant="filled"
                      />
                    </TableCell>                  
                    {weekDates.map((date) => (
                      <TableCell key={date}>
                        <Checkbox
                          id={`epds-${index}`}
                          type="checkbox"
                          name={getValue(index, date).toString()}
                          checked={Boolean(getValue(index, date))}
                          onChange={(e) =>
                            setValue(index, date, e.target.checked)
                          }
                          disabled={isFutureStartDate || (weekoffday === item.weekOff && date.getDay() === weekoffday)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 48 } }}
                          checkedIcon={<ToggleOn />}
                          icon={<ToggleOff />}
                        />
                      </TableCell>
                    ))}
                  </StyledTableRow>
                ))}
                <TableRow>
                <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {weekDates.map((day) => (
                    <TableCell key={day}>
                      {day.toLocaleDateString("en-US", weekDayFormat)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={submitAttendance}
            sx={{ marginTop: "20pt" }}
          >
            {loading ? <>Loading..</> : <>Submit Attendance</>}
          </Button>
        </>
      )}  
    </>
  );
};
