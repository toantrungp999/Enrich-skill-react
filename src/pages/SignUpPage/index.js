import React, { memo, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { SEX_OPTIONS } from 'constants/options';
import { LOADING_STATUS } from 'constants/apis';

import FormSelect from 'components/fields/FormSelect';
import FormInput from 'components/fields/FormInput';

import useSignUp from 'hooks/useSignUp';

import './styles.scss';

const SignUpPage = () => {
  const { register, handleSubmit, control, setError } = useForm();

  const { signUpStatus, onSignUp } = useSignUp();

  const rulesOfFields = useMemo(
    () => ({
      name: {
        required: true,
        minLength: 6,
        maxLength: 255,
      },
      email: {
        required: true,
        minLength: 6,
        maxLength: 255,
      },
      phoneNumber: {
        required: true,
        minLength: 6,
        maxLength: 12,
      },
      sex: {
        required: true,
      },
      userName: {
        required: true,
        minLength: 6,
        maxLength: 255,
      },
      password: {
        required: true,
        minLength: 6,
        maxLength: 255,
      },
    }),
    [],
  );

  const onSubmit = data => {
    onSignUp(data);
  };

  useEffect(() => {
    if (signUpStatus.status === LOADING_STATUS.FAILED && signUpStatus.error) {
      setError('name', {
        type: 'default',
        message: signUpStatus.error,
      });
    }
  }, [signUpStatus.status, signUpStatus.error]);

  return (
    <Container className="mock-sign-up-page" component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <FormInput
            id="name"
            name="name"
            label="Họ và tên"
            autoFocus
            register={register}
            rules={rulesOfFields.name}
            control={control}
          />
          <FormInput
            id="email"
            name="email"
            label="Địa chỉ email"
            type="email"
            autoComplete="email"
            register={register}
            rules={rulesOfFields.email}
            control={control}
          />
          <FormInput
            id="phoneNumber"
            label="Số điện thoại"
            name="phoneNumber"
            type="phone"
            register={register}
            rules={rulesOfFields.phoneNumber}
            control={control}
          />
          <FormSelect
            id="sex"
            label="Giới tính"
            name="sex"
            options={SEX_OPTIONS}
            register={register}
            rules={rulesOfFields.sex}
            control={control}
          />
          <FormInput
            id="userName"
            name="userName"
            label="Email hoặc tài khoản"
            autoFocus
            register={register}
            rules={rulesOfFields.userName}
            control={control}
          />
          <FormInput
            id="password"
            name="password"
            label="Mật khẩu"
            type="password"
            register={register}
            rules={rulesOfFields.password}
            control={control}
          />
          <Button
            disabled={signUpStatus.status === LOADING_STATUS.LOADING}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button component={Link} to="/sign-in" variant="body2">
                Đã có tài khoản? Đăng nhập
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SignUpPage);
