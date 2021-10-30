import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';

type ProtectedRouteProps = {
  auth: boolean;
  children: ReactNode;
  path: string;
  redirectPath: string;
};

export default function ProtectedRoute({
  auth,
  children,
  redirectPath,
  ...otherProps
}: ProtectedRouteProps) {
  return (
    <Route
      exact
      {...otherProps}
      render={() => (auth ? children : <Redirect to={redirectPath} />)}
    />
  );
}
