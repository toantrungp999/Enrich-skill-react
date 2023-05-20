import axios from 'axios';
import moment from 'moment-timezone';

import { ACCESS_TOKEN } from 'constants/storageKeys';
import { METHOD } from 'constants/apis';

import settings from '../../settings';

import { getStorage } from '../storage';

export const setHeader = (isAuthenticated, contentType) => {
  const headers = {
    'Content-Type': contentType || 'application/json; charset=utf-8',
    'X-Timezone-Offset': moment.tz.guess(),
    Authorization: 'Bearer ',
  };
  if (isAuthenticated) {
    const token = getStorage(ACCESS_TOKEN);
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const instance = axios.create({ baseURL: settings.BASE_URL });

export default instance;

export const getData = ({
  url,
  isAuthenticated = true,
  responseType,
  params,
  cancelToken,
}) =>
  instance({
    method: METHOD.GET,
    headers: setHeader(isAuthenticated),
    url,
    params,
    responseType,
    cancelToken,
  });

export const postData = ({
  url,
  isAuthenticated = true,
  responseType,
  contentType,
  data,
}) =>
  instance({
    method: METHOD.POST,
    headers: setHeader(isAuthenticated, contentType),
    url,
    data,
    responseType,
  });

export const putData = ({
  url,
  isAuthenticated = true,
  responseType,
  contentType,
  data,
}) =>
  instance({
    method: METHOD.PUT,
    headers: setHeader(isAuthenticated, contentType),
    url,
    data,
    responseType,
  });

export const deleteData = ({ url, isAuthenticated = true }) =>
  instance({
    method: METHOD.DELETE,
    headers: setHeader(isAuthenticated),
    url,
  });

export const patchData = ({
  url,
  isAuthenticated = true,
  responseType,
  data,
}) =>
  instance({
    method: METHOD.PATCH,
    headers: setHeader(isAuthenticated),
    url,
    data,
    responseType,
  });
