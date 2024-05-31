import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormContext } from "react-hook-form";

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
    console.log("in select setdefaultvalue")
    if (sentdefaultvalue !== undefined && objects.length > 0) {
      console.log("in select setdefaultvalue in if", controlname)
      setAge(sentdefaultvalue);
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
  }, [objects]);

  const handleChange = (event) => {
    if ("gender" === sentname)
      sentdefaultvalue = event.target.value;

    try {
      const temp = sendvalues.find((ele) => {
        return ele.valueitem === event.target.value;
      });
      setAge(event.target.value);
      register(controlname, { required: false });
      setValue(controlname, event.target.value);
      const altlbl = controlname + "1";
      register(altlbl, { required: false });
      setValue(altlbl, temp.labelitem, { shouldValidate: true });
      if ("categoryId" === sentname)
        isRequired.getselectedvaluefuntion(event.target.value);
    } catch (error) {
      console.log("error in setting", error);
    }
  };

  const callHandleChange = () => {
    if (sentname === "categoryId") {
      const pass = { target: { value: sentdefaultvalue } };
      handleChange(pass);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          label={label}
          name={sentname}
          defaultValue={""}
          required
          sx={{ height: 64 }}
          onChange={handleChange}
          value={age}
        >
          {objects?.map((valueitem, index) => {
            return (
              <MenuItem key={index} value={valueitem.valueitem}>
                {valueitem.labelitem}
              </MenuItem>
            );
          })}
        </Select>
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
