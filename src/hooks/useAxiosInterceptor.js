/* eslint-disable consistent-return */
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setError } from 'slices/error';
import { setAuthenticated } from 'slices/user';

import { STATUS_CODE } from 'constants/statusCodes';
import { AUTH_STATUS, METHOD } from 'constants/apis';

const useAxiosInterceptor = instance => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onSetError = useCallback(error => {
    dispatch(setError(error));
    history.push('/error-page');
  }, []);

  const reqInterceptor = instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
  );
  const resInterceptor = instance.interceptors.response.use(
    response => response,
    error => {
      if (axios.isCancel(error)) {
        return;
      }

      const { status = 500, config = {}, data = {} } = error?.response || {};

      switch (status) {
        case STATUS_CODE.UNAUTHORIZED:
          dispatch(setAuthenticated(AUTH_STATUS.LOGOUT));
          history.push('/sign-in');
          break;
        case STATUS_CODE.NOT_FOUND: {
          if (config.method === METHOD.GET) {
            let NOT_FOUND_PATH = '/not-found';

            if (data?.Data?.[0]?.message) {
              NOT_FOUND_PATH = `${NOT_FOUND_PATH}?messageError=${data.data[0].message}`;
            }

            history.push(NOT_FOUND_PATH);
          }
          break;
        }
        case STATUS_CODE.BAD_REQUEST:
        case STATUS_CODE.METHOD_NOT_ALLOWED:
          config.method === METHOD.GET && onSetError(error);
          break;
        case STATUS_CODE.FORBIDDEN:
        case STATUS_CODE.SERVER_ERROR:
        default: {
          onSetError(error);
          break;
        }
      }

      return Promise.reject(error);
    },
  );

  useEffect(
    () => () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    },
    [reqInterceptor, resInterceptor],
  );
};

export default useAxiosInterceptor;
