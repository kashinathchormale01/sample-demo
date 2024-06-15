import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import axiosHttp from "../../../AxiosInstance";
import { toast } from "react-toastify";
import moment from "moment";

const columns = [
  {
    field: "id",
    headerName: "Emp Id",
    valueGetter: (value, row) => `NKS-${row.id}`,
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "dateOfJoning",
    headerName: "Date of Joining",
    type: "Date",
    width: 210,
    valueGetter: (value, row) =>
      `${moment(row.dateOfJoning).format("DD/MM/YYYY")}`,
  },
  {
    field: "SPLallowance",
    headerName: "Special Allowance(Editable)",
    type: "text",
    width: 210,
    editable: true,
    headerClassName: "blinkItem",
    renderCell: (params) => {
      const { id, SPLallowance } = params.row;
      return <TextField className="blinkIteminput" value={SPLallowance} />;
    },
  },
];

const SelectEmp = () => {
  const [sitedata, setSitedata] = useState();
  let stateFromLocalStorage = sessionStorage?.getItem("dataGridState");
  const stateemplist = sessionStorage?.getItem("selectedemp")?.split(",");
  const result = stateemplist?.map((number) => parseInt(number));
  const [selectedEmp, setSelectedEmp] = useState(result);
  let currentState = null;
  // console.log("checking emplist", result);
  // console.log("checking emp", sessionStorage?.getItem("selectedemp"));

  const handleSelectionChange = (item) => {
    // console.log("selection fuction", item);
    if (item.length > 0) {
      setSelectedEmp(item);
      sessionStorage.setItem("selectedemp", item);
    }
  };

  const handleStateChange = React.useCallback((params) => {
    currentState = params.rows.dataRowIdToModelLookup;
    // console.log("currentState", currentState);
    // console.log(
    //   "State data is",
    //   params,
    //   "condition checking",
    //   Object.keys(currentState).length
    // );
    try {
      if (Object.keys(currentState).length > 0) {
        sessionStorage.setItem("dataGridState", JSON.stringify(currentState));
        sessionStorage.setItem(
          "selectedEmployee",
          JSON.stringify(params.rowSelection)
        );
      }
    } catch {}
  }, []);

  let sessionsids = [];
  sessionsids.push(sessionStorage.getItem("site.Id"));
  // console.log("sessionsids", sessionsids);
  const newsiteData = sessionsids[0].split(",").map((item) => parseInt(item));
  // console.log("newsessionsids in emp page", newsiteData);

  const SentSite = {
    siteId: newsiteData,
  };

  useEffect(() => {
    axiosHttp
      .post("/GetSiteEmp", SentSite)
      .then((res) => {
        if (res.data.msg === "worker ale ka") {
          const parsedata = res.data.data.map((entry, index) => ({
            id: entry.Id,
            lastName: entry.lastName,
            firstName: entry.firstName,
            fatherSpouseName: entry.fatherSpouseName,
            dateOfJoning: entry.dateOfJoning,
            SPLallowance: entry.SPLallowance,
          }));

          const selectedidlist = parsedata.map((value, index) => value.id);
          // console.log("parsedata", selectedidlist);
          if (!sessionStorage?.getItem("selectedemp"))
            setSelectedEmp(selectedidlist);
          try {
            stateFromLocalStorage = JSON.parse(stateFromLocalStorage);
            // console.log("stateFromLocalStorage", stateFromLocalStorage);
          } catch (error) {}
          let rows = null;
          try {
            rows = Object.values(stateFromLocalStorage).map((entry, index) => ({
              id: entry.id,
              lastName: entry.lastName,
              firstName: entry.firstName,
              fatherSpouseName: entry.fatherSpouseName,
              dateOfJoning: entry.dateOfJoning,
              SPLallowance: entry.SPLallowance,
            }));
            const selectedidlist = rows.map((value, index) => value.id);
            if (!sessionStorage?.getItem("selectedemp"))
              setSelectedEmp(selectedidlist);
          } catch (error) {
            console.log("maping error", error);
          }

          if (
            !(
              sessionStorage?.getItem("billStartDate") &&
              sessionStorage?.getItem("billEndDate")
            )
          ) {
            toast.error("Start and End date not selected");
          }

          stateFromLocalStorage === null ||
          Object.keys(stateFromLocalStorage).length === 0
            ? setSitedata(parsedata)
            : setSitedata(rows);
        } else {
          alert(res.data.msg);
          console.log("Error occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleCellEditChangeStart = (item) => {
  //   console.log("handleCellEditChangeStart item", item);
  // };

  const rows = sitedata === undefined ? [] : sitedata;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onStateChange={handleStateChange}
        // onCellEditStop={handleCellEditStop}
        pageSizeOptions={[1, 5, 10, 15]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        // onCellEditStart={(item) => handleCellEditChangeStart(item)}
        checkboxSelection
        rowSelectionModel={selectedEmp}
        onRowSelectionModelChange={(item) => handleSelectionChange(item)}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SelectEmp;
