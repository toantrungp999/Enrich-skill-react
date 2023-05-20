import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';

import { updatedErrorMessage } from 'services/validation';

import './styles.scss';

const FormSelect = ({
  autoFocus,
  id,
  name,
  label,
  options,
  rules,
  control,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({
      field: { value, ref, onChange },
      fieldState: { invalid, error },
    }) => (
      <TextField
        inputRef={ref}
        fullWidth
        select
        margin="normal"
        autoFocus={autoFocus}
        id={id}
        label={label}
        error={invalid}
        helperText={updatedErrorMessage({ label, error, rules })}
        value={value || ''}
        onChange={onChange}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

FormSelect.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  rules: PropTypes.object,
  control: PropTypes.any.isRequired,
};

FormSelect.defaultProps = {
  autoFocus: false,
  id: '',
  name: '',
  label: '',
  options: [],
  rules: { required: false },
};

export default memo(FormSelect);
