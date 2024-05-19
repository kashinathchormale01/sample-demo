import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
  Box,
  Chip,
  Button,
  TextField,
  Checkbox
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BillInitialValues from "../BillGeneration/FormModel/BillInitialValues";
import validationSchema from "../BillGeneration/FormModel/validationSchema";

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

// const validationSchema = yup.object().shape({
//   selectedSite: yup.array().min(1, "Select at least one location").required(),
//   dateValue: yup.date().required("Date is required"),
// });

// const validationSchema = yup.object().shape({
//   selectedSite: yup.array().min(1, "Select at least one location").required(),
//   startDate: yup.date().required("Start date is required"),
//   endDate: yup.date()
//     .required("End date is required")
//     .min(yup.ref('startDate'), 'End date must be after start date')
// });

const BillSitePage = () => {
  const [sitelocationlist, setSitelocationlist] = useState([]);
  const [selectedSite, setSelectedSite] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(dayjs());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSiteLocation = async () => {
    try {
      setLoading(true);
      let result = await axios.get("/GetProj_Site");
      setSitelocationlist(result.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Error:", err);
    }
  };

  const handleDateChange = (date) => {
    setDateValue(date);   
  };

  const handleChangeselect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSite(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  useEffect(() => {
    loadSiteLocation();
  }, []);

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    // You can perform further actions like submitting to a server here
  };

  return (
   <>
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

         

          

          </>
         
       
  );
};

export default BillSitePage;
