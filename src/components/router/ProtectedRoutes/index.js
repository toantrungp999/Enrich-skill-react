import React, { memo, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import withRequireAuth from 'hocs/withRequireAuth';
import withHideAfterAuth from 'hocs/withHideAfterAuth';

const ProtectedRoutes = ({ routes }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {routes.map(({ path, component, exact, hideAfterAuth, requiredAuth }) => {
        if (requiredAuth) {
          return (
            <Route
              key={path}
              path={path}
              component={withRequireAuth(component)}
              exact={exact}
            />
          );
        }

        if (hideAfterAuth) {
          return (
            <Route
              key={path}
              path={path}
              component={withHideAfterAuth(component)}
              exact={exact}
            />
          );
        }

        return (
          <Route key={path} path={path} component={component} exact={exact} />
        );
      })}
    </Switch>
  </Suspense>
);

ProtectedRoutes.propTypes = {
  routes: PropTypes.array,
  // isAuthenticated: PropTypes.bool,
};

ProtectedRoutes.defaultProps = {
  routes: [],
  // isAuthenticated: false,
};

export default memo(ProtectedRoutes);
