import React, { memo, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { LOADING_STATUS } from 'constants/apis';

import CustomButton from 'components/core/CustomButton';
import CustomCheckbox from 'components/core/CustomCheckbox';
import FormInput from 'components/fields/FormInput';

import useLogin from 'hooks/useLogin';

import './styles.scss';

const SignInPage = () => {
  const { loginStatus, onLogin } = useLogin();

  const { register, handleSubmit, control, setError } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const rulesOfFields = useMemo(
    () => ({
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
    const { userName, password } = data;

    onLogin({ data: { userName, password } });
  };

  useEffect(() => {
    if (loginStatus.status === LOADING_STATUS.FAILED && loginStatus.error) {
      setError('password', {
        type: 'default',
        message: loginStatus.error,
      });
    }
  }, [loginStatus.status, loginStatus.error]);

  return (
    <Container className="mock-sign-in-page" component="main" maxWidth="xs">
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
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={
              <CustomCheckbox
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  color: 'var(--white)',
                  '&.Mui-checked': {
                    color: 'var(--white)',
                  },
                }}
                defaultChecked
                value="remember"
              />
            }
            label="Nhớ tài khoản"
          />
          <CustomButton
            disabled={loginStatus.status === LOADING_STATUS.LOADING}
            type="submit"
            fullWidth
            variant="outlined"
            className="mock-sign-in-page__sign-in-btn"
            label={
              loginStatus.status === LOADING_STATUS.LOADING
                ? 'LOADING'
                : 'Đăng nhập'
            }
          />
          <Grid container>
            <Grid item xs>
              <Button component={Link} to="/forgot-password" variant="body2">
                Quên mật khẩu
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/sign-Up" variant="body2">
                Chưa có tài khoản? Đăng ký
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SignInPage);
