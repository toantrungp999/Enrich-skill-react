import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

const CustomCheckbox = ({ size, label, className, sx, onChange }) => (
  <Checkbox
    size={size}
    label={label}
    className={className}
    onChange={onChange}
    sx={sx}
  >
    {label}
  </Checkbox>
);

CustomCheckbox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  sx: PropTypes.object,
  onChange: PropTypes.func,
};

CustomCheckbox.defaultProps = {
  size: 'button',
  className: '',
  label: '',
  sx: {},
  onChange() {},
};

export default memo(CustomCheckbox);
