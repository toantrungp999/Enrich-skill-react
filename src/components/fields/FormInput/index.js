import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { updatedErrorMessage } from 'services/validation';

import './styles.scss';

const FormInput = ({
  disabled,
  autoFocus,
  id,
  name,
  type,
  rules,
  control,
  label,
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
        disabled={disabled}
        fullWidth
        margin="normal"
        autoFocus={autoFocus}
        id={id}
        type={type}
        label={label}
        error={invalid}
        helperText={updatedErrorMessage({ label, error, rules })}
        value={value || ''}
        onChange={onChange}
      />
    )}
  />
);

FormInput.propTypes = {
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  control: PropTypes.any.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  rules: PropTypes.object,
};

FormInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  id: '',
  name: '',
  label: '',
  type: 'text',
  rules: { required: false },
};

export default memo(FormInput);
