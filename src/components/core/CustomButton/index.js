import React, { memo } from 'react';
import PropTypes from 'prop-types';
import UIButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(UIButton)(() => ({
  color: 'var(--white)',
  background: 'var(--purple-primary)',
  borderRadius: '24px',
  margin: '8px 0 16px 0',
  '&:hover': {
    backgroundColor: '#a35de1',
  },
}));

const CustomButton = ({
  disabled,
  fullWidth,
  type,
  variant,
  className,
  label,
  Component,
  onClick,
}) => (
  <Component
    disabled={disabled}
    fullWidth={fullWidth}
    type={type}
    variant={variant}
    className={className}
    onClick={onClick}
  >
    {label}
  </Component>
);

CustomButton.propTypes = {
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  Component: PropTypes.any,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  disabled: false,
  fullWidth: true,
  type: 'button',
  variant: 'outlined',
  className: '',
  label: '',
  Component: Button,
  onClick() {},
};

export default memo(CustomButton);
