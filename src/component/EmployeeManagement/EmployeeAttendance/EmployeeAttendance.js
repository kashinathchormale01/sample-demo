import React, { useMemo, useState,useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
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
  Typography,
  FormControl,InputLabel,Select,OutlinedInput,MenuItem,ListItemText,Box,Chip,CircularProgress
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import Button from "@mui/material/Button";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PreviousWeekIcon from '@mui/icons-material/NextWeek';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { sitesloc } from "../../global/common/StubData/CommonStubData";
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from "react-toastify";
import moment from "moment";
import axiosHttp from "../../../AxiosInstance";

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

const SendSiteSchema = yup.object().shape({
  siteId: yup.string().required("required"),
});

const initialValues = {
  siteId: "",
};

const dateOffset = (date, offset) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + offset);
  return newDate;
};

const getFirstDayOfWeek = (date) => {
  const day = (date.getDay() + 6) % 7; // Monday is the first day of week
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
  /**
   * week start date
   */
  const [startDate, setStartDate] = useState(getFirstDayOfWeek(new Date()));
  /**
   * Week end date
   */
  const isFutureStartDate = useMemo(() => startDate > new Date(), [startDate]);

  const [monthly, setMonthly] = React.useState(false);
  const [data, setData] = useState([]);
  // const [data, setData] = useState([
  //   {emp_id:1,
  //   sheet:{}
  // },
  // {emp_id:2,
  //   sheet:{}
  // },
  // {emp_id:3,
  //   sheet:{}
  // },
  // {emp_id:4,
  //   sheet:{}
  // }
  // ]); 
 
  const handlePreviousWeek = () => {
    setStartDate((currDate) => dateOffset(currDate, -7));
  };

  const handleNextWeek = () => {
    setStartDate((currDate) => dateOffset(currDate, 7));
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

  const setWeekOff = (index, day) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].weekOff = day;
      setWeekoffday(newData[0].weekOff)
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
        console.log('Status', err.response.status);
        setError(err.message);
          // The client was given an error response (5xx, 4xx)
          console.log('Error response', err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
          // The client never received a response, and the request was never left
          console.log('Error Request', err.message);
      } else {
          // Anything else
          setLoading(false);
          setError(err.message);
          console.log('Error anything', err.message);
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
    console.log(res);
    console.log(res.data);
    // setGetAttendanceres(res.data.data);
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
      const weekOff = "";
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
    console.log(transformData);  
    setData(transformData);
    toast.success(res.data.msg);
    setIsButtonDisabled(false);
  });
};

const submitAttendance = async () => {
  const dateKeys = {};
  data.forEach((emp) => {
    Object.entries(emp.sheet).forEach(([date, value]) => {
      if (value === true) {
        if (!dateKeys[date]) {
          dateKeys[date] = [];
        }
        dateKeys[date].push(emp.emp_id);
      }
    });
  });

  // Create filtered data with emp_id arrays
  const filteredData = Object.keys(dateKeys).map((date) => ({
    date,
    emp_ids: dateKeys[date],
  }));

  const makeAttendancePayload = {
    selectedSite,
    filteredData,
  };
  // post api call for attendance with required payload
  try {
    setLoading(true); // Set loading before sending API request
    const res = await axiosHttp.post("/Attendance", makeAttendancePayload);
    const response = res; // Response received
    toast.success(res.data.msg);
    setLoading(false); // Stop loading
  } catch (err) {
    setLoading(false); // Stop loading in case of error
    console.error(error);
  }  
};

  useEffect(() => {
    loadSiteLocation();
  }, []);

  console.log('emplistbylocation',emplistbylocation);
  if (loading) return <>Loading...<CircularProgress /></>;
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
                  //console.log(value);
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
                  {/* <TableCell>WeekOff</TableCell> */}
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
                    {/* <TableCell>
                      <FormControl>
                        <InputLabel id={`week-off-label-${index}`}>
                          Week Off
                        </InputLabel>
                        <Select
                          labelId={`week-off-label-${index}`}
                          id={`week-off-select-${index}`}
                          value={item.weekOff}
                          onChange={(e) => setWeekOff(index, e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Mon">Mon</MenuItem>
                          <MenuItem value="Tue">Tue</MenuItem>
                          <MenuItem value="Wed">Wed</MenuItem>
                          <MenuItem value="Thu">Thu</MenuItem>
                          <MenuItem value="Fri">Fri</MenuItem>
                          <MenuItem value="Sat">Sat</MenuItem>
                          <MenuItem value="Sun">Sun</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </TableCell> */}

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
                {/* <TableCell></TableCell> */}
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
      {/* {data.length <= 0 && <Typography color="error">Employee's not assigned with this site</Typography>} */}
      {/* {data.length && <Typography color="error">{data.length}</Typography>} */}
      {/* Just for visualization purposes */}
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};
