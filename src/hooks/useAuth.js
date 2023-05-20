import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ACCESS_TOKEN } from 'constants/storageKeys';
import { AUTH_STATUS } from 'constants/apis';

import { getStorage } from 'services/storage';

import {
  setAuthenticated,
  getUserInfoRequest,
  authenticatedSelector,
} from 'slices/user';

const useAuth = () => {
  const authenticated = useSelector(authenticatedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated === AUTH_STATUS.LOGIN) {
      dispatch(getUserInfoRequest());
    }
  }, [authenticated]);

  useEffect(() => {
    const token = getStorage(ACCESS_TOKEN);

    dispatch(setAuthenticated(token ? AUTH_STATUS.LOGIN : AUTH_STATUS.LOGOUT));
  }, []);

  return { authenticated };
};

export default useAuth;
