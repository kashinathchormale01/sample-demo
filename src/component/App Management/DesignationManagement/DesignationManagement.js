import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { toast } from "react-toastify";
import ConfirmBox from "../../../global/common/confirmDialog/ConfirmDialog";
import axiosHttp from "../../../AxiosInstance";

const DesignationManagement = () => {
  const [designationlist, setDesignationlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteDesignationData, setDeleteDesignationData] = useState({});
  const navigate = useNavigate();

  const loadDesignations = async () => {
    try {
      let result = await axiosHttp.get("/GetRole");
      setDesignationlist(result.data.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
        console.log("Error response", err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        // Anything else
        setLoading(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    loadDesignations();
  }, []);

  const deleteDesignations = async () => {
    await axiosHttp
      .delete(`/DeleteProj_Site/${deleteDesignationData?.Id}`)
      .then((res) => {
        toast.error(res.data.msg);
        loadDesignations();
        setOpen(false);
      });
  };

  function openDelete(data) {
    setOpen(true);
    setDeleteDesignationData(data);
  }

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  if (error) return <p>Error: {error}</p>;
  if (!designationlist.length)
    return (
      <>
        {" "}
        <Button
          variant="contained"
          color="primary"
          startIcon={<ManageAccountsIcon />}
          onClick={() => navigate("/add-designation")}
        >
          Add New Designation/Role
        </Button>{" "}
        <Typography color="error">No Designation available!</Typography>
      </>
    );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ManageAccountsIcon />}
        onClick={() => navigate("/add-designation")}
      >
        Add New Designation/Role
      </Button>
      <TableContainer
        sx={{ maxWidth: "50%", marginTop: "20px" }}
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
              <TableCell>Sr.No</TableCell>
              <TableCell>Role Id</TableCell>
              <TableCell>Role/Designation Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designationlist.map((item, index) => (
              <TableRow key={item.RoleName}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.Id}</TableCell>
                <TableCell>{item.RoleName}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<ManageAccountsIcon />}
                      onClick={() => navigate(`/edit-designation/${item.Id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<ManageAccountsIcon />}
                      onClick={() => openDelete(item)}
                    >
                      Delete
                    </Button>
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
        title={deleteDesignationData?.RoleName}
        deleteFunction={deleteDesignations}
      />
    </>
  );
};

export default DesignationManagement;
