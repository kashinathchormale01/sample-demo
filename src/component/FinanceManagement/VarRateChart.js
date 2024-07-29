import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosHttp from '../../AxiosInstance';
import { toast } from 'react-toastify';

const VarRateChart = () => {
  const [vrates, setVrates] = useState();
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  const handleErrors = (err) => {
    setLoading(false);
    setError(err.message || 'An error occurred');
  };

  const loadVratesvalues = async () => {
    try {
      const result = await axiosHttp.get('/GetFixRates');
      setVrates(result.data.data[0]);
      setShowTable(false);
      setLoading(false);
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    loadVratesvalues();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    console.log('data',data)
    const initialnullvalues = {High_Skilled:null, Semi_Skilled:null, Skilled:null, UnSkilled:null, DArate: null, HRARate: null, PFRate: null, ESICRate: null, incomeTax: null, Id: 1 };
    const newval = Object.values(data).map(item => parseFloat(item));
    const updatedInitialValues = { ...initialnullvalues };
    
    Object.keys(initialnullvalues).forEach((key, index) => {
      if (key !== 'Id') {
        updatedInitialValues[key] = newval[index];
      }
    });

    try {
      setLoading(true);
      const result = await axiosHttp.put('/UpdateFixRates', updatedInitialValues);
      toast.success(result.data.msg);
      setLoading(false);
      loadVratesvalues();
    } catch (err) {
      handleErrors(err);
    }
  };

  const watchAllFields = watch(["High_Skilled","Semi_Skilled","Skilled","UnSkilled","DArate", "HRARate", "PFRate", "ESICRate", "incomeTax"]);
  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  return (
    <>
      <Checkbox 
        checked={showTable} 
        onChange={(e) => setShowTable(e.target.checked)} 
        color="primary"
      />
      <label htmlFor="showTable">Do you want to update the rate chart?</label>

      {showTable && (
        loading ? <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div> : error ? <div>Error: {error}</div> : vrates && (
          <TableContainer sx={{ maxWidth: '100%', marginTop: '20px' }} component={Paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ "& th": { fontSize: "1rem", color: "rgba(96, 96, 96)", backgroundColor: "#b1dbdf" } }}>
                  <TableCell>High Skilled(Basic)</TableCell>
                  <TableCell>Semi Skilled(Basic)</TableCell>
                  <TableCell>Skilled(Basic)</TableCell>
                  <TableCell>Un Skilled(Basic)</TableCell>
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
                  <TableCell><TextField defaultValue={vrates.High_Skilled} {...register("High_Skilled", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.Semi_Skilled} {...register("Semi_Skilled", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.Skilled} {...register("Skilled", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.UnSkilled} {...register("UnSkilled", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.DArate} {...register("DArate", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.HRARate} {...register("HRARate", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.PFRate} {...register("PFRate", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.ESICRate} {...register("ESICRate", { required: true })} /></TableCell>
                    <TableCell><TextField defaultValue={vrates.incomeTax} {...register("incomeTax", { required: true })} /></TableCell>
                    <TableCell><Button type="submit" variant='contained' color='primary' disabled={!watchAllFields.every(Boolean)}>Update</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </form>
            <div>{(errors.High_Skilled || errors.Semi_Skilled || errors.Skilled || errors.UnSkilled || errors.DArate || errors.HRARate || errors.PFRate || errors.ESICRate || errors.incomeTax) && <TableRow><TableCell><Typography color="error">This field is required</Typography></TableCell></TableRow>}</div>
          </TableContainer>
        )
      )}
    </>
  )
}

export default VarRateChart;
