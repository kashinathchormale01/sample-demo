import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosHttp from '../../AxiosInstance';
import { toast } from 'react-toastify';
import { AddAlert } from '@mui/icons-material';

const VarRateChart = () => {

  const [vrates, setVrates] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    DArate: null,
    HRARate: null,
    PFRate: null,
    ESICRate: null,
    incomeTax: null,
    Id: 1
  }); // Store initial values

  const loadVratesvalues = async () => {
    try {
      let result = await axiosHttp.get('/GetFixRates');
      setVrates(result.data.data[0]);
      setInitialValues(result.data.data[0]); // Set initial values
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    loadVratesvalues();    
  }, []);

  const { register, onBlur, handleSubmit, formState: { errors }, watch } = useForm();

  const onChange =(data) => {
    console.log('Hi onchange called',data);
    setInitialValues(data);
  }

  const handleChange = (value) => {
    //console.log('Hi onchange called',value);
   // const { name, value } = e.target;
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
   //   console.log(`${value} is a valid float value: ${floatValue}`);
      // Do something if it's a valid float value
    } else {
  //    console.log(`${value} is not a valid float value`);
      // Do something if it's not a valid float value
    }
  };
   
  const onSubmit = async (data) => {
  
const initialnullvalues = { DArate: null, HRARate: null, PFRate: null, ESICRate: null, incomeTax: null, Id: 1 };
const newval = Object.values(data);
    console.log('newval',newval);
    const plainval = newval.map((item, index)=>{
     return parseFloat(item);
    });
    console.log('plainval',plainval);

    const updatedInitialValues = { ...initialnullvalues };    
    // Map array values to initialValues object keys excluding 'Id'
    Object.keys(initialnullvalues).forEach((key, index) => {
      if (key !== 'Id') {
        updatedInitialValues[key] = plainval[index];
      }
    }); 
 console.log('updatedInitialValues',updatedInitialValues);
    try {
      let result = await axiosHttp.put('/UpdateFixRates', updatedInitialValues);
      toast.success(result.data.msg);
      setLoading(false);
      loadVratesvalues();
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  const watchAllFields = watch(["DArate", "HRARate", "PFRate", "ESICRate", "incomeTax"]);

  // Check if values have changed from initial values
  const isFormChanged = () => {
    if (!initialValues) return false;
    for (let key in initialValues) {
      if (vrates[key] !== initialValues[key]) return true;
    }
    return false;
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: {error}</div>
      ) : vrates && (<>
        <TableContainer sx={{ maxWidth: '50%', marginTop: '20px' }} component={Paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <TableCell>DA</TableCell>
                  <TableCell>HRA</TableCell>
                  <TableCell>PF</TableCell>
                  <TableCell>ESIC</TableCell>
                  <TableCell>Proffession Tax</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField defaultValue={vrates.DArate} {...register("DArate", { required: true })} />                   
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={vrates.HRARate} {...register("HRARate", { required: true })} />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={vrates.PFRate} {...register("PFRate", { required: true })} />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={vrates.ESICRate} {...register("ESICRate", { required: true })} />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={vrates.incomeTax} {...register("incomeTax", { required: true })} />
                  </TableCell>
                  <TableCell>
                    <Button type="submit" variant='contained' color='primary' disabled={!watchAllFields.every(Boolean)}>Update</Button>
                  </TableCell>                 
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </TableContainer>
        <div>
               {(errors.DArate || errors.HRARate || errors.PFRate || errors.ESICRate || errors.incomeTax) && <TableRow><TableCell><Typography color="error">This field is required</Typography></TableCell></TableRow>}
        </div> </>
      )}
    </>
  )
}

export default VarRateChart;
