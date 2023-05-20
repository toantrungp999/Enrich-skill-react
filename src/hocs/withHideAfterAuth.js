import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AUTH_STATUS } from 'constants/apis';

import { authenticatedSelector } from 'slices/user';

const withHideAfterAuth = PassedComponent => {
  const WrappedComponent = wrappedProps => {
    const history = useHistory();
    const authenticated = useSelector(authenticatedSelector);

    switch (authenticated) {
      case AUTH_STATUS.LOGIN:
        history.push('/');
        return null;
      default:
        return <PassedComponent {...wrappedProps} />;
    }
  };

  return memo(WrappedComponent);
};

export default withHideAfterAuth;
