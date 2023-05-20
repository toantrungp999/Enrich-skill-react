import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { METHOD } from 'constants/apis';
import { SIGN_UP_PATH } from 'constants/paths';

import useAPI from './userAPI';

const useSignUp = () => {
  const history = useHistory();

  const { onCallAPI: signUpRequest, data: signUpStatus } = useAPI();

  const onSignUp = useCallback(data => {
    const callback = isSuccess => {
      isSuccess && history.push('/sign-in');
    };

    signUpRequest({
      method: METHOD.POST,
      data,
      url: SIGN_UP_PATH,
      callback,
    });
  }, []);

  return { signUpStatus, onSignUp };
};

export default useSignUp;
