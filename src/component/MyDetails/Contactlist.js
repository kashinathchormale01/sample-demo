import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup,FormControlLabel,Checkbox } from '@mui/material';
import { BarSeries, Chart, CategoryAxis, ValueAxis } from '@mui/x-charts';
import axiosHttp from "../../AxiosInstance";

const Contactlist = () => {

    const [sitelocations, setSitelocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false);
  const [selectedsite, setSelectedsite] = useState([]);
  const navigate = useNavigate();

  const loadSiteLocation = async () => {
    try {
      let result = await axiosHttp.get('/GetProj_Site');
      setSitelocations(result.data.data);
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
    loadSiteLocation();
  }, []);

  useEffect(() => {
    // Initialize selectedsite state with all site IDs
    if (sitelocations.length > 0) {
        const allSiteIds = sitelocations.map(site => site.Id);
        setSelectedsite(allSiteIds);
    }
}, [sitelocations]);

const handleChange = async(e)=>{
    const siteId = parseInt(e.target.value);
    setSelectedsite(prevState => {
        console.log('prev state', prevState)
        if (e.target.checked) {
            return [...prevState, siteId];
        } else {
            return prevState.filter(id => id !== siteId);
        }
    });
}
const handleButtonClick = () => {
   // Log or use the SentSite object as needed
    console.log("All site IDs:", selectedsite);
}

    return (
     <>
       <FormGroup>
      {sitelocations.map((site, index)=>(
                 <FormControlLabel keys={index}
                // onChange={handleChange}
           control={<Checkbox onChange={handleChange} checked={selectedsite.includes(site.Id)} />}
           label={site.siteName} value={site.Id}
         />
              
      ))}
      </FormGroup>

      <Button onClick={handleButtonClick} disabled={!selectedsite.length} variant="contained" color="primary">Send Selected Sites</Button>

      </>
    );
};

export default Contactlist;
