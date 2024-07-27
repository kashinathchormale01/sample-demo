import React, { useEffect, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, FormGroup, FormControlLabel, Checkbox, Typography,CircularProgress } from "@mui/material";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useFormContext, Controller } from "react-hook-form";
import axiosHttp from "../../../AxiosInstance";
import moment from "moment/moment";
let siteIdCookie = sessionStorage?.getItem("site.Id")?.split(",")?.map(Number);

const DateSite = () => {
  const { control } = useFormContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()
  const { register, setValue, getValues } = useFormContext();
  const [sitedata, setSitedata] = React.useState();
  const [selectedsite, setSelectedsite] = React.useState();
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  React.useEffect(() => {
    axiosHttp
      .get("/GetProj_Site")
      .then((res) => {
        if (res.data.msg === "Sites List") {
          // console.log("success", res.data.data);
          const allSiteIds = res.data.data.map((site) => site.Id);
          setSitedata(res.data.data);
          setLoading(false);
          if (siteIdCookie === undefined) {
            // console.log(
            //   "Cookie Status if",
            //   sitedata,
            //   "condition",
            //   sessionStorage.getItem("dataGridState")
            // );
            console.log(allSiteIds)
            setSelectedsite(allSiteIds);
            setLoading(false);
          } else {
            // console.log(
            //   "Cookie Status else",
            //   sitedata,
            //   "condition",
            //   siteIdCookie
            // );
            setSelectedsite(siteIdCookie);
          }
        } else {
          alert(res.data.msg);
          console.log("Erro occured");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    sessionStorage.removeItem("dataGridState");
    const siteId = parseInt(e.target.value);
    setSelectedsite((prevState) => {
      if (e.target.checked) {
        setSelectedsite(prevState.length + 1);
        return [...prevState, siteId];
      } else {
        return prevState.filter((id) => id !== siteId);
      }
    });
  };

  React.useEffect(() => {
    if (selectedsite !== undefined) {
      siteIdCookie = selectedsite;
      sessionStorage.setItem("site.Id", selectedsite);
    }
  }, [selectedsite]);

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;

  return (
    <div
      className="monthlyDatePicker"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        boxShadow:"none"
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["MonthCalendar", "year"]}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            verticalAlign: "baseline",
          }}
        >
          <DemoItem key={"1"} sx={{ m: 4 }} label={'From'}>         
            <DateCalendar
            disableFuture={true}
            className="monthcal"
              views={["year", "month"]}
              openTo="month"
              onChange={(newValue) => {
                if (newValue) {
                  setStartdate(newValue.$d);
                  sessionStorage.setItem(
                    "billStartDate",
                    moment(newValue.$d).startOf("month").format("YYYY/MM/DD")
                  );
                }
              }}
            />
          </DemoItem>
          <DemoItem key={"2"} sx={{ marginTop: "0" }} label="To">            
             <DateCalendar
             disableFuture={true}
           className="monthcal 2ndmonth"
              views={["year", "month"]}
              openTo="month"
              onChange={(newValue) => {
                if (newValue) {
                  setEndDate(newValue.$d);
                  sessionStorage.setItem(
                    "billEndDate",
                    moment(newValue.$d).endOf("month").format("YYYY/MM/DD")
                  );
                }
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      <div className="checboxwrapper">
        <>
        <Typography variant="h4">Please select the sites</Typography>
          <FormGroup sx={{ flexDirection: "row", maxWidth: "95%" }} label="Select Sites">
            {sitedata?.map((site, index) => (
              <FormControlLabel 
                key={site.Id}
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={selectedsite.includes(sitedata[index].Id)}
                  />
                }
                label={site.siteName}
                value={site.Id}
              />
            ))}
          </FormGroup>
        </>
      </div>
    </div>
  );
};

export default DateSite;
