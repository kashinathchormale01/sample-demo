import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { InputField, SelectField, DatePickerField } from '../../../../global/FormFields';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {genderData} from '../../../../global/common/StubData/CommonStubData'
import moment from 'moment';


  const nationalitylist = [
    {
      value: '0',
      label: 'India'
    },
    {
        value: '1',
        label: 'USA'
    }
  ];

  
export default function EmpProfileForm(props) {
     const [countryName, setCountryName] = React.useState("India");
     const [genderlist, setGenderlist] = React.useState(genderData);
    const {
        formField: {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            aadharNumber,
            fatherSpouseName,
            nationality,
            educationLevel,
            dateOfJoning,
        }
      } = props;
      
      return (
        <React.Fragment>
          <Typography mt={4} variant="h6" gutterBottom>
            Profile Form
          </Typography>
          <Grid mt={0} mb={2} container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={firstName.name}
                label={firstName.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={lastName.name}
                label={lastName.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={gender.name}
                label={gender.label}
                data={genderlist}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerField
                name={dateOfBirth.name}
                label={dateOfBirth.label}
                inputFormat="dd/MM/yyyy"
                views={["day", "month", "year"]}
                minDate={new Date("1900/01/01")}
                maxDate={new Date("2006/01/01")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: "dd/mm/yyyy",
                    }}
                  />
                )}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                name={aadharNumber.name}
                label={aadharNumber.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={fatherSpouseName.name}
                label={fatherSpouseName.label}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                <SelectField
                    name={nationality.name}
                    label={nationality.label}                    
                    data={nationalitylist}
                    fullWidth
                />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <InputField
                name={nationality.name}
                label={nationality.label}
                fullWidth                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={educationLevel.name}
                label={educationLevel.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <DatePickerField
                name={dateOfJoning.name}
                label={dateOfJoning.label}
                inputFormat="dd/MM/yyyy"
                views={["day", "month", "year"]}
                minDate={new Date()}
                maxDate={new Date()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    slotProps={{
                      ...params.inputProps,
                      placeholder: "dd/mm/yyyy",
                    }}
                  />
                )}
                sx={{ width: "100%" }}
              /> */}
              <DatePickerField
                 name={dateOfJoning.name}
                 label={dateOfJoning.label}
                defaultValue={moment("2022-04-17")}
                slotProps={{ field: { shouldRespectLeadingZeros: true } }}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      );
}