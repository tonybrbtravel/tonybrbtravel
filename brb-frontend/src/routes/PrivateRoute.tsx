import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface RouteWrapperProps extends Omit<RouteProps, 'component'> {
  component: (props: any) => ReactElement;
}

export const PrivateRoute = ({
  path,
  component: Component,
  exact,
}: RouteWrapperProps) => {
  const isAuthenticated = useSelector((state: any) => state?.signin?.authenticated);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        isAuthenticated
          ? <Component />
          : <Redirect to="signup" />
      )}
    />
  );
};

export const VerifyCodeRoute = ({
  path,
  component: Component,
  exact,
}: RouteWrapperProps) => {
  const verifyActive = useSelector((state: any) => state?.signup?.verifyActive);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        verifyActive
          ? <Component />
          : <Redirect to="signup" />
      )}
    />
  );
};
