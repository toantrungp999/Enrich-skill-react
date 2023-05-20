import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AUTH_STATUS } from 'constants/apis';

import { authenticatedSelector } from 'slices/user';

const withRequireAuth = PassedComponent => {
  const WrappedComponent = wrappedProps => {
    const history = useHistory();
    const authenticated = useSelector(authenticatedSelector);

    switch (authenticated) {
      case AUTH_STATUS.LOGIN:
        return <PassedComponent {...wrappedProps} />;
      case AUTH_STATUS.LOGOUT:
        history.push('/sign-in');
        return null;
      default:
        return null;
    }
  };

  return memo(WrappedComponent);
};

export default withRequireAuth;
