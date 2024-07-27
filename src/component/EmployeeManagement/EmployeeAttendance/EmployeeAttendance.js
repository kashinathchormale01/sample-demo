import React,{useState} from "react";
import axiosHttp from "../../../AxiosInstance";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ToggleOff from "@mui/icons-material/ToggleOff";
import { Checkbox,CircularProgress,Box, Chip } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign:'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign:'center'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
let rows = [];
let daylenth = 0;
let firstview = null;

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


export const EmployeeTimeSheet = () => {
  /**
   * site locationlist state
   */
  function createData(Id, firstName, fatherSpouseName, lastName) {
    return { Id, name: firstName + " " + fatherSpouseName + " " + lastName };
  }
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [siteLocaionlist, setSiteLocaionlist] = useState([]);
  const [sheet, setSheet] = useState([]);
  const [mapsheet, setMapsheet] = useState([]);
  const [sendingsheet, setSendingsheet] = useState([]);
  const [selecteddate, setSelecteddate] = useState(dayjs()); 

  const [daysarry, setDaysarry] = useState([
    dayjs(selecteddate).format("YYYY-MM-DD"),
  ]);
  const siteobjet = { siteId: age };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const createweeklyview = () => {
   
    firstview = null;
    let tempdayarry = [dayjs(selecteddate).format("YYYY-MM-DD")];
    if (
      daylenth > 7 &&
      dayjs(selecteddate).startOf("month").diff(selecteddate, "day")
    ) {
      setSelecteddate(dayjs(selecteddate).startOf("month"));
     
      console.log(
        "date 1 month",
        Boolean(
          daylenth > 7 &&
            dayjs(selecteddate).startOf("month").diff(selecteddate, "day")
        )
      );
    }

    for (var i = 0; i < daylenth - 1; i++) {
      try {
        tempdayarry.push(
          dayjs(selecteddate)
            .add(i + 1, "day")
            .format("YYYY-MM-DD")
        );
      } catch (err) {}
    }
    setDaysarry(tempdayarry);
    
  };
  const handledatchange = (value) => {
    setSelecteddate(value);
  };
  const getsitedata = async () => {
    await axiosHttp.get("/GetProj_Site").then((res) => {
      setSiteLocaionlist(
        res.data.data.map((value) => ({
          valueitem: value.Id,
          labelitem: value.siteName,
        }))
      );
      
    });
  };

  const loademployee = async () => {
    firstview = null;
    await axiosHttp
      .post("/GetAttendance", siteobjet)
      .then((res) => {
        setSheet(
          res.data.data.map((value) => ({
            
            Id: value.Id,
            name:value.firstName +" " +value.fatherSpouseName +" " +value.lastName,
            daysheet: String(value.Sheet).split(","),
            attendenceBy: value.attendenceBy
          }
        
        ))
        );      
      });
  };

  const reeditsheet = async () => {
    const result = [];
    
    sheet.forEach((obj) => {     
      const newObj = {
        Id: obj.Id,
        name: obj.name,
        attendenceBy: obj.attendenceBy
      };

      
      daysarry.forEach((date) => {
        const key = `day${date.replace(/-/g, "")}`;
        if (obj.daysheet.includes(date)) {
          newObj[key] = "true";
        } else {
          newObj[key] = "false";
        }
      });

      result.push(newObj);
    });

    setMapsheet(result);
    if (firstview === null && result.length>0){ 
   // console.log('Result.lengh',result.length)
      firstview = result;
    }
  };

  const handleChangecheckbox = (e) => {
    const { name, checked } = e.target;

    const updatedMapsheet = mapsheet.map((row) => {
      if (row.Id === parseInt(e.target.id)) {
        return {
          ...row,
          [name]: checked ? "true" : "false",
        };
      }
      return row;
    });

    setMapsheet(updatedMapsheet); 
  };

  
  const compareObjects = (first, second) => {
    const result = {
      selectedSite: age, 
      filteredData: [],
    };

    first.forEach((firstItem, index) => {
      const secondItem = second[index];
      const pushdate = [];
      const popdate = [];

      Object.keys(firstItem).forEach((key) => {
        if (key.startsWith("day")) {
          console.log("format date", key.substring(3));
          const date = dayjs(key.substring(3), "YYYYMMDD").format("YYYY/MM/DD");
          if (firstItem[key] === "false" && secondItem[key] === "true") {
            pushdate.push(date);
          } else if (firstItem[key] === "true" && secondItem[key] === "false") {
            popdate.push(date);
          }
        }
      });

      if (pushdate.length > 0 || popdate.length > 0) {
        result.filteredData.push({
          emp_id: firstItem.Id.toString(),
          pushdate,
          popdate,
        });
      }
    });

    return result;
  };

  const submitattendance = async () => {
    if (firstview != null) {
      const result = compareObjects(firstview, mapsheet);
      console.log("firstview", firstview);
      console.log("mapsheet", mapsheet);
      console.log("result is", result);
      await axiosHttp
        .post("/AttendanceNew", result)
        .then((res) => {
          toast.success(res.data.msg);
        });
        getsitedata();
    }
  };

  React.useEffect(() => {
    if (age) loademployee();
  }, [age]);
  React.useEffect(() => {
    getsitedata();
  }, []);
  React.useEffect(() => {
    reeditsheet();
    createweeklyview();
  }, [selecteddate]);
  React.useEffect(() => {
    reeditsheet();
  }, [sheet]);
  React.useEffect(() => {
    reeditsheet();
  }, [daysarry]); 
  

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress /><br/>Loading...</div></div>;
 

  return (
    <>
   <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Select Site
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          style={{ width: 300 }}
          defaultValue=""
          value={age}
          label="Select Site"
          onChange={handleChange}
        >
          {siteLocaionlist?.map((valueitem, index) => {
            return (
              <MenuItem key={index} value={valueitem.valueitem}>
                {valueitem.labelitem}
              </MenuItem>
            );
          })}
        </Select>
       
      </FormControl>
   </Box>
    
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker", "DatePicker", "DatePicker"]}
          sx={{ margin: "20px 0", maxWidth:'230pt' }}
        >
          <DatePicker
            label={"Select Date"}
            views={["year", "month", "day"]}
            value={selecteddate}
            format="DD/MM/YYYY"
            sx={{ width: "100%" }}
            onChange={handledatchange}
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
   
   {mapsheet.length>0 && (
     <>
    <Box>
      <Stack spacing={4} marginBottom={2} direction="row" justifyContent={'left'}>
        
        <Button
          variant="outlined"
          onClick={() => {
            daylenth = 1;
            createweeklyview();
          }}
          endIcon={<CalendarTodayOutlinedIcon />}
          
        >
          Day View
        </Button>
        <Button
         size="medium"
         variant="outlined"
         color="warning"
         onClick={() => {
            daylenth = 7;
            createweeklyview();
          }}
          endIcon={<ViewWeekOutlinedIcon />}>
          Weekly View
        </Button>
        <Button
        size="medium"
          variant="outlined"
           color="success"
          endIcon={<CalendarMonthIcon />}
          onClick={() => {
            daylenth = 28;
            createweeklyview();          
            
          }}
        >
          Monthly View
        </Button>
      </Stack>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow  
            sx={{ "& th": {
                      fontSize: "1rem",
                      color: "rgba(96, 96, 96)",
                      backgroundColor: "#b1dbdf",
                    },
                  }}>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell sx={{minWidth:'200pt', textAlign:'left !important'}}>
              Name
            </StyledTableCell>
            {daysarry.map((value, index) => (
              <StyledTableCell key={index}>{dayjs(value).format('ddd,MMM DD')}</StyledTableCell>
            ))}
            <TableCell>Attendance Marked By</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mapsheet.map((row, index) => (
            <StyledTableRow key={row.Id}>
              <StyledTableCell component="th">{row.Id}</StyledTableCell>
              <StyledTableCell sx={{minWidth:'200pt', textAlign:'left !important'}}>{row.name}</StyledTableCell>

              {daysarry.map((value) => (
                <StyledTableCell key={`${row.Id}-${value}`}>                 
                  <Checkbox
                    id={`${row.Id}`}
                    name={`day${dayjs(value).format("YYYYMMDD")}`}
                    checked={
                      row[`day${dayjs(value).format("YYYYMMDD")}`] === "true"
                    }
                    onChange={handleChangecheckbox}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 48 } }}
                    checkedIcon={<ToggleOn />}
                    icon={<ToggleOff />}
                  />
                </StyledTableCell>             
              ))}
              <TableCell>
              <Chip
                        label={row.attendenceBy}
                        color="success"
                        variant="filled"
                      />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
      <Stack spacing={2} direction="row" marginTop={2}>
        <Button 
          type="submit" 
          variant="contained"
          color="primary" 
          onClick={submitattendance}>
          Submit Attendance
        </Button>
      </Stack>
   
    </>
   )}
  </>
  );
};
