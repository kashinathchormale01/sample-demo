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
  const [age1, setAge] = React.useState("");
  const { register, setValue } = useFormContext();
  const controlname = String(sentname);
  let objects = [];
  objects = sendvalues;
  const handleChange = (event) => {
    setAge(event.target.value);

    register(controlname, { required: false });
    setValue(controlname, event.target.value);
    try {
      const temp = sendvalues.find((ele) => {
        return ele.valueitem === event.target.value;
      });
      const altlbl = controlname + "1";
      register(altlbl, { required: false });
      setValue(altlbl, temp.labelitem, { shouldValidate: true });
    } catch (error) {}
  };
  function setdefaultvalue() {
    let temp;
    try {
      temp = sendvalues.find((ele) => {
        return ele.valueitem === sentdefaultvalue;
      });
    } catch (error) {}
    console.log(
      "dep setdefault called",
      objects[0]?.valueitem,
      "and set value is",
      sentname
    );
    console.log("temp", temp);
    if (temp !== undefined && objects.length > 0) {
      setAge(sentdefaultvalue);
    } else {
      if (sentname === "roleId" && objects.length > 0) {
        console.log("delayed", objects[0]?.valueitem);
        setAge("");
        setAge(objects[0]?.valueitem);
        register(sentname, { required: false });
        setValue(sentname, objects[0]?.valueitem, { shouldValidate: true });
        const altlbl = controlname + "1";
        register(altlbl, { required: false });
        setValue(altlbl, objects[0]?.labelitem, { shouldValidate: true });
      }
    }
  }

  React.useEffect(() => {
    setdefaultvalue();
  }, [objects]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={age1}
          label={label}
          required
          onChange={handleChange}
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
    </Box>
  );
};

export default SelectComp;
