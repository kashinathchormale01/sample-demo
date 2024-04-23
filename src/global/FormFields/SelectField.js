import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

function SelectField(props) {
  const { label, data, onChange, ...rest } = props; // Destructuring onChange from props
  const [field, meta, helpers] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  const handleChange = (event) => {
    helpers.setValue(event.target.value); // Update formik field value
    if (onChange) {
      onChange(event.target.value); // Invoke the onChange prop
    }
  };

  return (
    <FormControl {...rest} error={isError} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue ? selectedValue : ''} onChange={handleChange}> {/* Adding onChange */}
        {data.map((item, index) => (
          <MenuItem key={index} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func // Adding PropTypes for onChange
};

export default SelectField;