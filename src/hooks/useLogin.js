import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ACCESS_TOKEN } from 'constants/storageKeys';
import { AUTH_STATUS, METHOD } from 'constants/apis';
import { LOGIN_PATH } from 'constants/paths';

import { setStorage } from 'services/storage';

import { setAuthenticated, userInfoSelector, logoutRequest } from 'slices/user';

import useAPI from './userAPI';

const useLogin = () => {
  const { onCallAPI: loginRequest, data: loginStatus } = useAPI();

  const userInfo = useSelector(userInfoSelector);

  const dispatch = useDispatch();

  const onSetAssessToken = useCallback(data => {
    const { token } = data;

    setStorage({ key: ACCESS_TOKEN, val: token });
    dispatch(setAuthenticated(AUTH_STATUS.LOGIN));
  }, []);

  const onClearAssessToken = useCallback(() => {
    setStorage({ key: ACCESS_TOKEN, val: '' });
  }, []);

  const onLogin = useCallback(async params => {
    const { isSuccess, data } = await loginRequest({
      method: METHOD.POST,
      data: params.data,
      url: LOGIN_PATH,
      callback: params.callback,
    });

    if (isSuccess) {
      onSetAssessToken(data);
    }
  }, []);

  const onLogout = useCallback(() => {
    onClearAssessToken();
    dispatch(logoutRequest());
  }, []);

  return { loginStatus, userInfo, onLogin, onLogout };
};

export default useLogin;
