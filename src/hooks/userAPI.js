import { useCallback, useRef, useState } from 'react';
import axios from 'axios';

import {
  getData,
  postData,
  putData,
  patchData,
  deleteData,
} from 'services/api';

import { LOADING_STATUS, METHOD } from 'constants/apis';

const useAPI = () => {
  const [data, setData] = useState({
    status: LOADING_STATUS.IDE,
    data: null,
    error: null,
  });

  const sourceRef = useRef(null);

  const onCancelAPI = useCallback(() => {
    sourceRef.current?.cancel('Operation canceled by the user.');
  }, [sourceRef.current]);

  const onCallAPI = useCallback(
    async ({
      isFile = false,
      method,
      params,
      data: dataBody,
      url,
      options = {},
      callback,
    }) => {
      setData(prev => ({
        ...prev,
        status: LOADING_STATUS.LOADING,
      }));

      let response = null;
      const { CancelToken } = axios;
      sourceRef.current = CancelToken?.source();

      try {
        switch (method) {
          case METHOD.GET:
            response = await getData({
              url,
              params,
              cancelToken: sourceRef.current?.token,
              ...options,
            });
            break;
          case METHOD.POST:
            response = await postData({
              url,
              data: dataBody,
              ...options,
            });
            break;
          case METHOD.PUT:
            response = await putData({
              url,
              data: dataBody,
              ...options,
            });
            break;
          case METHOD.PATCH:
            response = await patchData({
              url,
              data: dataBody,
              ...options,
            });
            break;
          case METHOD.DELETE:
            response = await deleteData({
              url,
              ...options,
            });
            break;
          default:
            break;
        }

        const result = isFile ? response?.data : response?.data?.data;

        setData(prev => ({
          ...prev,
          data: result,
          status: LOADING_STATUS.SUCCEEDED,
        }));

        if (callback) {
          callback(true);
        }

        return {
          isSuccess: true,
          data: result,
        };
      } catch (error) {
        const { message = [] } = error;
        const errorMessage =
          error?.response?.data?.data?.[0]?.message ||
          message ||
          'Something went wrong!';

        setData(prev => ({
          ...prev,
          status: LOADING_STATUS.FAILED,
          error: errorMessage,
        }));

        if (callback) {
          callback(false, errorMessage);
        }

        return {
          isSuccess: false,
          error: errorMessage,
        };
      }
    },
    [sourceRef.current],
  );

  return {
    data,
    onCancelAPI,
    onCallAPI,
  };
};

export default useAPI;
