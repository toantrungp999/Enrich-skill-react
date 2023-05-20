import React, { memo, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { SEX_OPTIONS } from 'constants/options';
import { LOADING_STATUS } from 'constants/apis';

import FormSelect from 'components/fields/FormSelect';
import FormInput from 'components/fields/FormInput';

import useUser from 'hooks/useUser';

import './styles.scss';

const ProfilePage = () => {
  const { register, handleSubmit, control, reset, clearErrors, setError } =
    useForm();

  const { userInfo, updateUserInfoStatus, onUpdateUserInfoRequest } = useUser();

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
    }),
    [],
  );

  const onSubmit = data => {
    onUpdateUserInfoRequest(data);
  };

  useEffect(() => {
    if (
      updateUserInfoStatus.status === LOADING_STATUS.FAILED &&
      updateUserInfoStatus.error
    ) {
      setError('name', {
        type: 'default',
        message: updateUserInfoStatus.error,
      });
    }
  }, [updateUserInfoStatus.status, updateUserInfoStatus.error]);

  useEffect(() => {
    if (userInfo.data) {
      const { userName, name, email, phoneNumber, sex } = userInfo.data;

      reset({
        userName,
        name,
        email,
        phoneNumber,
        sex,
      });
    } else {
      clearErrors();
      reset();
    }
  }, [userInfo]);

  return (
    <Container className="mock-profile-page" component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Thông tin cá nhân
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <FormInput
            disabled
            id="userName"
            name="userName"
            label="Email hoặc tài khoản"
            autoFocus
            register={register}
            rules={rulesOfFields.userName}
            control={control}
          />
          <FormInput
            disabled
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
            id="name"
            name="name"
            label="Họ và tên"
            autoFocus
            register={register}
            rules={rulesOfFields.name}
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

          <Button
            disabled={updateUserInfoStatus.status === LOADING_STATUS.LOADING}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cập nhật
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button component={Link} to="/update-password" variant="body2">
                Cập nhật mật khẩu
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(ProfilePage);
