import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import { login } from 'reducers/auth/reducer';
import withPromise from 'helpers/withPromise';
import messages from './translate';

interface IProps {
  login(data: object, promise: IPromiseCallback): string;
}
class Login extends React.PureComponent<IProps> {
  static contextTypes = {
    router: T.shape({
      history: T.shape({
        push: T.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  private login = (data: ILoginFormData): Promise<any> => {
    const { login } = this.props;
    const { router } = this.context;

    return withPromise(login, {
      password: data.password,
      username: data.email,
      company: data.company,
    }).then((res?: ISubmitFormError) => {
      if (res && res.error) return Promise.resolve(res);
      router.history.push('/items');
    });
  };

  render() {
    return (
      <div className="row h-100">
        <div className="col fl-column-c">
          <div className="wrap-login-logo">
            <img
              src="/images/logo-login.png"
              alt="Inventory"
              className="logo-login"
            />
          </div>
          <LoginForm onSubmit={this.login} />
          <div className="wrap-text-login">
            <Link to="/login/forgot-password" className="login-text">
              <FormattedMessage {...messages.forgotPassword} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const enhance: any = connect(null, { login });

export default enhance(Login);
