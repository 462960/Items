import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MinimalLayout from 'components/layouts/MinimalLayout/MinimalLayout';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import RecoveryPassword from './RecoveryPassword/RecoveryPassword';

class Auth extends React.PureComponent<IWithRouter> {
  render() {
    const { match } = this.props;

    return (
      <MinimalLayout>
        <div className="container -wide h-100">
          <Switch>
            <Route exact path={match.url} component={Login} />
            <Route
              path={match.url + '/forgot-password'}
              component={ForgotPassword}
            />
            <Route
              path={match.url + '/recovery-password/:token'}
              component={RecoveryPassword}
            />
          </Switch>
        </div>
      </MinimalLayout>
    );
  }
}

export default Auth;
