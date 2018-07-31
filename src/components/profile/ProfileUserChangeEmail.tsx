import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import PasswordInput from 'components/common/Form/PasswordInput';
import {
  required,
  validateEmail,
  validatePassword,
  composeValidators,
} from 'helpers/validators';
import Error from 'components/common/Form/Error';
import cn from 'classnames';

class ProfileUserChangeEmail extends React.Component<any> {
  private renderForm = () => {
    const {
      onChange,
      isPasswordSkipped,
      isEmailSkipped,
      handleSubmit,
    } = this.props;

    return (
      <>
        <form onChange={onChange} className="account-body container">
          {/* Password input */}
          <div className="row">
            <label className="col-2 list-text">Password</label>
            <div className="col-10">
              <div className="posr">
                <Field
                  wrapperClassName="m-b-10"
                  inline
                  name="password"
                  component={PasswordInput}
                  // placeholder={formatMessage(messages.password)}
                  validate={composeValidators(required, validatePassword)}
                  allowShowPassword
                  className={cn({ invalid: isPasswordSkipped })}
                />
                <Error
                  meta={{
                    touched: isPasswordSkipped,
                    active: false,
                    error: 'Password required',
                  }}
                  inline
                />
              </div>
            </div>
          </div>

          {/* New Email input */}
          <div className="row mb-10">
            <label className="col-2 list-text">New Email</label>
            <div className="col-10">
              <div className="posr">
                <Field
                  inline
                  name="new_email"
                  component={TextInput}
                  placeholder="Enter New Email"
                  validate={composeValidators(required, validateEmail)}
                  className={cn('form-control form-control-sm', {
                    invalid: isEmailSkipped,
                  })}
                />
                <Error
                  meta={{
                    touched: isEmailSkipped,
                    active: false,
                    error: 'Enter new Email',
                  }}
                  inline
                />
              </div>
            </div>
          </div>
        </form>
        <button
          onClick={handleSubmit}
          type="button"
          className="style-btn-non button-foot text-white"
        >
          Save Changes
        </button>
      </>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    return <Form onSubmit={handleSubmit} render={this.renderForm} />;
  }
}

export default ProfileUserChangeEmail;
