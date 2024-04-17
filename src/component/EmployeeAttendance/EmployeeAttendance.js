
import React, { useEffect, useMemo, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Typography,Chip  } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import ToggleOn from '@mui/icons-material/ToggleOn';
import ToggleOff from '@mui/icons-material/ToggleOff';
import Button from '@mui/material/Button';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "white",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#f1f1f1",
    },
  }));

const dateOffset = (date, offset) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + offset);
  return newDate;
};

const getFirstDayOfWeek = (date) => {
  const day = (date.getDay() + 6) % 7; // Monday is the first day of week
  return dateOffset(date, -day);
};

const weekDayFormat = { weekday: 'short', month: 'short', day: 'numeric' };

export const EmployeeTimeSheet = () => {
    const [dateValue, setDateValue] = React.useState(dayjs('04/10/2024'));
  const [startDate, setStartDate] = useState(getFirstDayOfWeek(new Date(dateValue.$d)));
  const isFutureStartDate = useMemo(() => startDate > new Date(), [startDate]);
  const [tableValue, setTableValue] = React.useState(31);
//   console.log(isFutureStartDate);
  
 

  const [data, setData] = useState(
    [
        {
            "emp_id": 1,
            "sheet": {
                "4/15/2024": true,
                "4/16/2024": false,
                "4/19/2024": true,
                "4/18/2024": true
            }
        },
        {
            "emp_id": 2,
            "sheet": {
                "4/16/2024": true,
                "4/17/2024": true,
                "4/20/2024": true,
                "4/21/2024": true
            }
        },
        {
            "emp_id": 3,
            "sheet": {
                "4/18/2024": true,
                "4/19/2024": true,
                "4/15/2024": true,
                "4/16/2024": true
            }
        }
       
    ]
  );

  const handlePreviousWeek = () => {
    setStartDate((currDate) => dateOffset(currDate, -7));
  };

  const handleNextWeek = () => {
    setStartDate((currDate) => dateOffset(currDate, 7));
  };

  const getValue = (index, date) => {
    const key = date.toLocaleDateString('en-US');
    return data[index].sheet[key] ?? '';
  };

  const setValue = (index, date, value) => {
    const key = date.toLocaleDateString('en-US');
    setData((prevData) => {
      const newData = [...prevData];
      // remove key if empty
      if (value === '') delete newData[index].sheet[key];
      else newData[index].sheet[key] = value;
      return newData;
    });
  };

//   const handleAddRow = () => {
//     setData([
//       ...data,
//       {
//         employee: `Employee ${data.length + 1}`,
//         sheet: {},
//       },
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setData((prevData) => {
//       const updatedData = [...prevData];
//       updatedData.splice(index, 1);
//       return updatedData;
//     });
//   };

function handleCalendarTableWeekly(){
       alert('clicked');
       let weekDates = Array.from({ length: 7 }, (_, i) =>
    dateOffset(startDate, i)
  );
};

  const getTotal = (index, dates) => {
    return dates.reduce((total, date) => {
      const val = 1 * getValue(index, date);
      return total + val;
    }, 0);
  };

 

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dateOffset(startDate, i)
  );



  return (
   <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem label="Controlled calendar">
          <DateCalendar value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>

      <Stack direction="row" spacing={2} alignItems={'center'}>
      <Button size='medium' onClick={handlePreviousWeek} variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />}>
        Previous Week
      </Button>
      <Typography>
      {` ${weekDates[0].toLocaleDateString(
          'en-US'
        )} - ${weekDates[6].toLocaleDateString('en-US')} `}
      </Typography>
      <Button size='medium' onClick={handleNextWeek} variant="outlined" endIcon={<ArrowForwardIosOutlinedIcon />}>
      Next Week
      </Button>
    </Stack>
    <Button onClick={handleCalendarTableWeekly}>Weekly</Button>

      <TableContainer sx={{ maxWidth: '100%', marginTop:'20px' }} component={Paper}>
      <Table aria-label="customized table">
      <TableHead>
      <TableRow
            sx={{
              "& th": {
                fontSize: "1rem",
                color: "rgba(96, 96, 96)",
                backgroundColor: "#b1dbdf"
              }
            }}
          >
             <TableCell>Employee</TableCell>
            {weekDates.map((day) => (
              <TableCell key={day}>
                {day.toLocaleDateString('en-US', weekDayFormat)}
              </TableCell>
            ))}
            <TableCell>Total Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              <TableCell>{item.emp_id}</TableCell>
              {weekDates.map((date) => (
                <TableCell key={date}>
                   <Checkbox
                    id={`epds-${index}`}
                    type="checkbox"
                      name={getValue(index, date)}
                      checked={getValue(index, date)}
                      onChange={(e) => setValue(index, date, e.target.checked)}
                      disabled={isFutureStartDate}                      
        
            sx={{ '& .MuiSvgIcon-root': { fontSize: 48 } }}
        icon={<ToggleOn />} checkedIcon={<ToggleOff />}
      />
                  
                </TableCell>
              ))}
              <TableCell><Chip label={getTotal(index, weekDates)} color="success" variant="filled" /></TableCell>
              {/* <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td> */}
            </StyledTableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            {weekDates.map((day) => (
              <TableCell key={day}>
                {day.toLocaleDateString('en-US', weekDayFormat)}
              </TableCell>              
            ))}
             <TableCell></TableCell>
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
