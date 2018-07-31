import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import { FormattedMessage, injectIntl } from 'react-intl';
import PasswordInput from 'components/common/Form/PasswordInput';
import Button from 'components/common/Button/Button';
import {
  required,
  validatePassword,
  composeValidators,
} from 'helpers/validators';
import messages from './translate';
import { validatePasswordEquality } from './validators';

interface IProps {
  onSubmit(values: IRecoveryFormData): Promise<any>;
}

class RecoveryPasswordForm extends React.PureComponent<IProps & IWithIntl> {
  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} className="form fg-w">
        <div className="wrap-title-login">
          <p className="title-login">
            <FormattedMessage {...messages.title} />
          </p>
        </div>
        {isShowSubmitError && (
          <div
            className="error static m-b-10"
            style={{ background: '#E5E9ED' }}
          >
            {submitError}
          </div>
        )}
        <Field
          wrapperClassName="m-b-10"
          name="new_password"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          component={PasswordInput}
          placeholder={formatMessage(messages.newPassword)}
          validate={composeValidators(required, validatePassword)}
          allowShowPassword
        />
        <Field
          wrapperClassName="m-b-10"
          name="confirm_password"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          component={PasswordInput}
          placeholder={formatMessage(messages.confirmPassword)}
          validate={composeValidators(required, validatePassword)}
          allowShowPassword
        />
        <Button
          className="btn btn-login w-100 mb-3"
          onClick={handleSubmit}
          disabled={submitting}
        >
          <FormattedMessage {...messages.btnSubmit} />
        </Button>
      </form>
    );
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        validateOnBlur
        onSubmit={onSubmit}
        render={this.renderForm}
        validate={validatePasswordEquality}
      />
    );
  }
}

const enhance = injectIntl;

export default enhance<IProps>(RecoveryPasswordForm);
