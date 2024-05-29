import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext,  Controller } from "react-hook-form";

const SelectComp = ({
  sendvalues,
  label,
  isRequired,
  sentname,
  sentdefaultvalue,
}) => {
  const [age, setAge] = React.useState("");
 
  const { register, setValue } = useFormContext();
  const controlname = String(sentname);
  const objects = sendvalues;
  const inputRef = React.useRef(null);
  function setdefaultvalue() {
    if (sentdefaultvalue !== undefined && objects.length > 0) {
      setAge(sentdefaultvalue);
      //console.log("ref got :",inputRef.current);

      register(controlname, { required: false });
      setValue(controlname, sentdefaultvalue);
      try {
        const temp = sendvalues.find((ele) => {
          return ele.valueitem === sentdefaultvalue;
        });
        const altlbl = controlname + "1";
        register(altlbl, { required: false });
        setValue(altlbl, temp.labelitem);
      } catch (error) {}
      if (sentname === "categoryId") {
        inputRef.current.click();
      }
    }
  }
  React.useEffect(() => {
    setdefaultvalue();
    // if (sentdefaultvalue !== undefined) {
    //   setAge(sentdefaultvalue);
    //   setValue(sentname, sentdefaultvalue);
    // }
  }, [objects]);

  // React.useEffect(()=>{
  //   callHandleChange();
  // },[sentdefaultvalue])
  const handleChange = (event) => {
   // console.log("options in select", objects);
if("gender"===sentname)
  sentdefaultvalue=event.target.value;

    try {
      const temp = sendvalues.find((ele) => {
        return ele.valueitem === event.target.value;
      });
      setAge(event.target.value);
      //console.log(temp.labelitem);
      register(controlname, { required: false });
      setValue(controlname, event.target.value);
      const altlbl = controlname + "1";
      register(altlbl, { required: false });
      setValue(altlbl, temp.labelitem, { shouldValidate: true });
if("categoryId"===sentname)
      isRequired.getselectedvaluefuntion(event.target.value);
    } catch (error) {
      console.log("error in setting", error);
    }
  };

  const callHandleChange = () => {
    //console.log("test is ",sentdefaultvalue);
    if (sentname === "categoryId") {
      const pass = { target: { value: sentdefaultvalue } };
      handleChange(pass);
      
    }
  };

  // const handleMenuOpen = () => {
  //   console.log("Options in the select:", objects);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>


      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

        <Select
          label={label}
          name={sentname}
          defaultValue={""}
          required
          sx={{ height: 64 }}
          onChange={handleChange}
          value={age}
          // renderValue={callHandleChange}
          // inputRef={inputRef}
          // onMenuOpen={handleMenuOpen}
          // ref={inputRef}
          // rules={{
          // required:`Please Select ${sentname}`
          //  }}
        >
          {objects?.map((valueitem, index) => {
            return (
              <MenuItem key={index} value={valueitem.valueitem}>
                {valueitem.labelitem}
              </MenuItem>
            );
          })}
        </Select>
        {/* <FormHelperText>{age===""? "Please Select Value" :""}</FormHelperText> */}
      </FormControl>
      {
        <button
          onClick={callHandleChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
      }
    </Box>
  );
};

export default SelectComp;
