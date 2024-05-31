import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SelectComp from "./../SelectComp";
import SelectCompdep from "./../SelectCompdep";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import axiosHttp from "../../../../AxiosInstance";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const WorkDetails = (data) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [siteLocaionlist, setSiteLocaionlist] = React.useState([]);
  const [WorkCategoryList, setWorkCategoryList] = React.useState([]);
  const [DesignationList, setDesignationList] = React.useState([]);
  const [selectecatvalue, setSelectecatvalue] = React.useState();
  // const [initsitelocation,setInitSiteLocation]=React.useState("");

  const siteloctionpassvalues = {
    sendvalues: siteLocaionlist,
    label: "Select Location",
    isRequired: "false",
    sentname: "siteId",
    sentdefaultvalue: data.values.siteId,
  };
  const getselectedvaluefuntion = (valeus) => {
    setSelectecatvalue(valeus);
  };
  const WorkCategorypassvalues = {
    sendvalues: WorkCategoryList,
    label: "Select Work Category",
    isRequired: { getselectedvaluefuntion },
    sentname: "categoryId",
    sentdefaultvalue: data.values.categoryId,
  };

  const isRequired = () => {
    if (selectecatvalue !== undefined) {
      axiosHttp.get("/GetRoleCat/" + selectecatvalue).then((res) => {
        setDesignationList(
          res.data.data.map((value) => ({
            valueitem: value.Id,
            labelitem: value.RoleName,
          }))
        );
      });
    }
  };
  const designationpassvalues = {
    sendvalues: DesignationList,
    label: "Select Designation",
    isRequired: "",
    sentname: "roleId",
    sentdefaultvalue: data.values.roleId,
  };

  const getsitedata = () => {
    axiosHttp.get("/GetProj_Site").then((res) => {
      setSiteLocaionlist(
        res.data.data.map((value) => ({
          valueitem: value.Id,
          labelitem: value.siteName,
        }))
      );
    });
  };

  const getWorkCategory = () => {
    axiosHttp.get("/GetCategory").then((res) => {
      setWorkCategoryList(
        res.data.data.map((value) => ({
          valueitem: value.Id,
          labelitem: value.CategoryWork,
        }))
      );
    });
  };

  React.useEffect(() => {
    getsitedata();
    getWorkCategory();
  }, []);

  React.useEffect(() => {
    isRequired();
  }, [selectecatvalue]);

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Item elevation={0}>
            <SelectComp {...siteloctionpassvalues} />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item elevation={0}>
            <SelectComp {...WorkCategorypassvalues} />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item elevation={0}>
            <SelectCompdep {...designationpassvalues} />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="serviceBookNumber"
              defaultValue={""}
              rules={{
                required: "Service Book Number is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="serviceBookNo"
                  label="Service Book Number"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.serviceBookNumber)}
                  helperText={errors.serviceBookNumber?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="serviceRemark"
              defaultValue={""}
              rules={{
                required: "Service Remark is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="serviceremark"
                  label="Service Remark"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.serviceRemark)}
                  helperText={errors.serviceRemark?.message}
                />
              )}
            />{" "}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkDetails;
