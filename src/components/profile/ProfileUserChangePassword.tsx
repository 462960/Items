import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import PasswordInput from 'components/common/Form/PasswordInput';
import {
  required,
  validatePassword,
  composeValidators,
} from 'helpers/validators';
import Error from 'components/common/Form/Error';
import cn from 'classnames';

const inputsData = [
  {
    id: 'jm95',
    label: 'Password',
    value: 'Enter',
    name: 'password',
    error: 'Password required',
  },
  {
    id: 'jGj7',
    label: 'New Password',
    value: 'Enter',
    name: 'new_password',
    error: 'New Password required',
  },
  {
    id: 'j657',
    label: 'Repeat Password',
    value: 'Enter',
    name: 'repeat_password',
    error: 'Repeat New Password',
  },
];

class ProfileUserChangePassword extends React.Component<any> {
  private renderForm = () => {
    const {
      isPasswordSkipped,
      isRepeatPasswordSkipped,
      isNewPasswordSkipped,
    } = this.props;

    const inputRow = inputsData.map((x) => (
      <div key={x.id} className="row">
        <label className="col-2 list-text">{x.label}</label>
        <div className="col-10">
          <div className="posr">
            <Field
              wrapperClassName="m-b-10"
              inline
              name={x.name}
              component={PasswordInput}
              placeholder="Enter"
              // placeholder={formatMessage(messages.password)}
              validate={composeValidators(required, validatePassword)}
              allowShowPassword
              className={cn({
                invalid:
                  (isPasswordSkipped && x.name === 'password') ||
                  (isNewPasswordSkipped && x.name === 'new_password') ||
                  (isRepeatPasswordSkipped && x.name === 'repeat_password'),
              })}
            />
            <Error
              meta={{
                touched:
                  (isPasswordSkipped && x.name === 'password') ||
                  (isNewPasswordSkipped && x.name === 'new_password') ||
                  (isRepeatPasswordSkipped && x.name === 'repeat_password'),
                active: false,
                error: x.error,
              }}
              inline
            />
          </div>
        </div>
      </div>
    ));

    const { onChange, handleSubmit } = this.props;

    return (
      <>
        <form onChange={onChange} className="account-body container">
          {inputRow}
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
    const { handleSubmit, data } = this.props;
    return (
      <Form
        onSubmit={handleSubmit}
        render={this.renderForm}
        initialValues={data}
      />
    );
  }
}

export default ProfileUserChangePassword;
