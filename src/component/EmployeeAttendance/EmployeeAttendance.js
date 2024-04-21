import React, { useMemo, useState,useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,InputLabel,Select,OutlinedInput,MenuItem,ListItemText,Box,Chip
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import Button from "@mui/material/Button";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { sitesloc } from "../../global/common/StubData/CommonStubData";

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
  const [sitelocationlist, setSitelocationlist] = useState(sitesloc);
  const [error, setError] = useState(null);
  const [selectedSite, setSelectedSite] = React.useState([]);

  const [dateValue, setDateValue] = React.useState(dayjs());
  const [loading, setLoading] = useState();
//  console.log('emplist',emplist);
  /**
   * week start date
   */
  const [startDate, setStartDate] = useState(getFirstDayOfWeek(new Date()));
  /**
   * Week end date
   */
  const isFutureStartDate = useMemo(() => startDate > new Date(), [startDate]);

  const [monthly, setMonthly] = React.useState(false);
  const [data, setData] = useState([
    {emp_id:1,
    sheet:{}
  },
  {emp_id:2,
    sheet:{}
  },
  {emp_id:3,
    sheet:{}
  },
  {emp_id:4,
    sheet:{}
  }
  ]);
  // const payloadData = emplist.map(emp => ({
  //   emp_id: emp.Id,
  //   sheet: {},
  // }))
//    const [data, setData] = useState();


//    function filterTrueSheets(data) {
//     const trueSheets = [];

//     data.forEach(employee => {
//         const emp_id = employee.emp_id;
//         const sheet = employee.sheet;
//         const trueDates = Object.keys(sheet).filter(date => sheet[date] === true);
//         if (trueDates.length > 0) {
//             trueSheets.push({ emp_id, sheet: Object.fromEntries(trueDates.map(date => [date, true])) });
//         }
//     });

//     return trueSheets;
// }

// const trueSheets = filterTrueSheets(data);
// console.log('truesheet',trueSheets);


  //  console.log('data',data);
  
  
  // console.log('payloadData',payloadData);
  

  // const [data, setData] = useState([
  //   {
  //     emp_id: 111,
  //     sheet: {
  //       "4/15/2024": false,
  //       "4/16/2024": true,
  //       "4/18/2024": true,
  //     },
  //   },
  //   {
  //     emp_id: 112,
  //     sheet: {
  //       "4/15/2024": true,
  //       "4/16/2024": false,
  //       "4/18/2024": true,
  //     },
  //   },
  // ]);

 
  // console.log('data',data);
  // const empID = emplist.map((emp)=>emp.Id);
  // console.log(empID);
  // data.map((item)=>item.emp_id).push(empID);

  const handleChangeselect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSite(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


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

  const loadEmployees = async () => {      
    try {
      let result = await axios.get('/GetEmp');               
      setLoading(false);
      const payloadData = result?.data?.data?.map(emp => ({
        emp_id: emp.Id,
        sheet: {},
      }))
      setData(payloadData); 
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
  useEffect(() => {
    loadEmployees();  
  }, []);

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Location</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name="demo-multiple-checkbox"
          value={selectedSite}
          onChange={handleChangeselect}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {sitesloc.map((site) => (
            <MenuItem key={site.siteId} value={site.siteId}>
              {/* <Checkbox checked={selectedSite.includes(site.siteId)} /> */}
              <ListItemText primary={site.siteName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem>
            <DateCalendar
              value={dateValue}
              onChange={handleDateChange}
            />
            </DemoItem>
        </DemoContainer> */}
            <DemoContainer sx={{margin:'20px 0'}} components={['DatePicker']}>
              <DatePicker label="Select a Date"  
              value={dateValue}
              onChange={handleDateChange} />
            </DemoContainer>
          
      </LocalizationProvider>

<Box sx={{display:'flex', flexDirection:'row'}}>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Button
          size="medium"
          onClick={handlePreviousWeek}
          variant="outlined"
          startIcon={<ArrowBackIosOutlinedIcon />}
        >
          Previous Week
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
          Next Week
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} alignItems={"center"} marginLeft={'100px'}>
        <Button variant="contained" color="secondary" size="medium" onClick={handleCalendarTableWeekly} 
        endIcon={<ViewWeekIcon />}>
        </Button><Typography>/</Typography>
        <Button variant="contained" color="primary" size="medium" onClick={handleCalendarTableMonthly}>
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
              <TableCell>Employee</TableCell>
              <TableCell>Total Attendance</TableCell>
              {weekDates?.map((day) => (
                <TableCell key={day}>
                  {day.toLocaleDateString("en-US", weekDayFormat)}
                </TableCell>
              ))}
              {/* <TableCell>Total Attendance</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <TableCell>{item.emp_id}</TableCell>

            
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
                      onChange={(e) => setValue(index, date, e.target.checked)}
                      disabled={isFutureStartDate}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 48 } }}
                      checkedIcon={<ToggleOn />}
                      icon={<ToggleOff />}
                    />
                  </TableCell>
                ))}
                {/* <TableCell><Chip label={getTotal(index, weekDates)} color="success" variant="filled" /></TableCell> */}
                {/* <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td> */}
              </StyledTableRow>
            ))}
            <TableRow>
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
      {/* <button onClick={handleAddRow}>Add New Project</button> */}

      {/* Just for visualization purposes */}
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};
