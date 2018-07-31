import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ForgotPasswordForm from 'components/auth/ForgotPasswordForm/ForgotPasswordForm';
import { forgotPassword } from 'reducers/auth/reducer';
import withPromise from 'helpers/withPromise';
import messages from './translate';

class ForgotPassword extends React.PureComponent<any> {
  static contextTypes = {
    router: T.shape({
      history: T.shape({
        push: T.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  private forgotPassword = (data: IFogotPasswordData): Promise<any> => {
    const { forgotPassword } = this.props;
    const { router } = this.context;

    return withPromise(forgotPassword, data).then((res?: ISubmitFormError) => {
      if (res && res.error) return Promise.resolve(res);
      router.history.push('/login');
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
          <ForgotPasswordForm onSubmit={this.forgotPassword} />
          <div className="wrap-text-login">
            <Link to="/login" className="login-text">
              <FormattedMessage {...messages.back} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const enhance: any = connect(null, { forgotPassword });

export default enhance(ForgotPassword);
