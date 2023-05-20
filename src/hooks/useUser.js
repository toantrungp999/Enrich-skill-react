import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { METHOD } from 'constants/apis';

import { userInfoSelector } from 'slices/user';
import { UPDATE_USER_INFO } from 'constants/paths';

import useAPI from './userAPI';

const useUser = () => {
  const userInfo = useSelector(userInfoSelector);

  const { onCallAPI: updateUserInfoRequest, data: updateUserInfoStatus } =
    useAPI();

  const onUpdateUserInfoRequest = useCallback(params => {
    updateUserInfoRequest({
      method: METHOD.PUT,
      data: params.data,
      url: UPDATE_USER_INFO,
      callback: params.callback,
    });
  }, []);

  return { updateUserInfoStatus, userInfo, onUpdateUserInfoRequest };
};

export default useUser;
