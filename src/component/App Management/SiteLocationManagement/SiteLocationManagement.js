import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Stack, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from "react-toastify";
import ConfirmBox from "../../../global/common/confirmDialog/ConfirmDialog";
import moment from "moment/moment";
import axiosHttp from "../../../AxiosInstance";

const SiteLocationManagement = (props) => {
  const [sitelocations, setSitelocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
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

  const deleteSiteLocation = async () => {
    await axiosHttp.delete(
      `/DeleteProj_Site/${deleteData?.Id}`
    ).then(res => {
      toast.error("Site location status made In-active...");
      loadSiteLocation();
      setOpen(false);
    });
  };

  const openDelete = async(data) =>{
    setOpen(true);
    setDeleteData(data);
  }

  const activateSite = async (site) => {
    try {
      let result = await axiosHttp.get(`/ActivateProj_Site/${site.Id}`);
      toast.success(result.data.msg);
      loadSiteLocation();
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

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  if (error) return <p>Error: {error}</p>;
  if (!sitelocations.length) return <>
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddLocationIcon />}
      onClick={() => navigate('/add-site-location')}
    >
      Add New Site Location
    </Button>
    <p>No Site Locations!</p>
  </>;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddLocationIcon />}
        onClick={() => navigate('/add-site-location')}
      >
        Add New Site Location
      </Button>
      <TableContainer sx={{ width: '100%', marginTop: '20px' }} component={Paper}>
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
              <TableCell>Sr.No</TableCell>
              <TableCell>Site Id</TableCell>
              <TableCell>Site Name</TableCell>
              <TableCell>Site Area</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sitelocations.map((site, index) => (
              <TableRow key={site.siteName}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {site.Id}
                </TableCell>
                <TableCell>{site.siteName}</TableCell>
                <TableCell>{site.siteArea}</TableCell>
                <TableCell>{moment(site.creationDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  {site.Status}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<EditLocationAltIcon />}
                      onClick={() => navigate(`/edit-site-location/${site.Id}`)}
                    >
                      Edit
                    </Button>
                    {site.Status !== 'Inactive' &&
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<WrongLocationIcon />}
                        onClick={() => openDelete(site)}
                      >
                        Make Inactive
                      </Button>
                    }
                    {site.Status === 'Inactive' &&
                     <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => activateSite(site)}
                    >
                      Active
                    </Button>
                  }
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation dialog functionality */}
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteData?.siteName}
        deleteFunction={deleteSiteLocation}
      />
    </>
  )
}

export default SiteLocationManagement;
