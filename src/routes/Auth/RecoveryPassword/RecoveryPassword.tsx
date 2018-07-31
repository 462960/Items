import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import RecoveryPasswordForm from 'components/auth/RecoveryPasswordForm/RecoveryPasswordForm';
import { recoveryPassword } from 'reducers/auth/reducer';
import withPromise from 'helpers/withPromise';
import messages from './translate';

class RecoveryPassword extends React.PureComponent<any> {
  static contextTypes = {
    router: T.object.isRequired,
  };

  private recoveryPassword = (data: IRecoveryFormData): Promise<any> => {
    const { recoveryPassword, match } = this.props;
    const { router } = this.context;

    return withPromise(recoveryPassword, {
      ...data,
      reset_token: match.params.token,
    }).then((res?: ISubmitFormError) => {
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
          <RecoveryPasswordForm onSubmit={this.recoveryPassword} />
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

const enhance: any = connect(null, { recoveryPassword });

export default enhance(RecoveryPassword);
